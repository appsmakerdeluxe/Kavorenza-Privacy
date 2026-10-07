import test from 'node:test';
import assert from 'node:assert/strict';
import { cargoSortEncode, cargoSortPermutation, echoWaveEncode, echoWaveSequence, mazeCourierCanMove, mazeCourierEncode, mazeCourierOpenMask, mazeCourierPath, NEW_MINIGAMES, NEW_MINIGAME_ECHO_REVEAL_MS, newMiniGameMaxScore, newMiniGameRoundScore, newMiniGameScoreRound, newMiniGameState, newMiniGameTarget, orbitRescueEncode, orbitRescueSequence, pixelForgeTargetMask, prismRelayReachesGoal, prismRelaySolutionMask, switchstormBoardMask, switchstormInitialMask, switchstormSolutionMask, switchstormToggleMask } from '../firebase-public/game-rules.js';

test('Echo Wave uses the same short reveal window as Android', () => {
  assert.equal(NEW_MINIGAME_ECHO_REVEAL_MS, 1800);
});

test('Prism Relay ray-traces four rotatable mirrors around a seeded center blocker', () => {
  const seed=4123,solutions=Array.from({length:5},(_,round)=>prismRelaySolutionMask(seed,round));
  assert.deepEqual(solutions,[3,12,12,12,3]);
  for(let round=0;round<5;round++){
    assert.equal(prismRelayReachesGoal(seed,round,solutions[round]),true);
    assert.equal(prismRelayReachesGoal(seed,round,solutions[round]^1),false);
    assert.equal(newMiniGameScoreRound('prism_relay',solutions[round],round,seed),1);
    assert.equal(newMiniGameScoreRound('prism_relay',solutions[round]^1,round,seed),0);
  }
});

test('Maze Courier has a deterministic four-step path and rejects illegal or altered routes', () => {
  const seed=4123;
  assert.deepEqual(Array.from({length:5},(_,round)=>mazeCourierPath(seed,round)),[[1,2,1,2],[2,2,1,1],[2,1,2,1],[2,2,1,1],[1,1,2,2]]);
  for(let round=0;round<5;round++){
    const path=mazeCourierPath(seed,round),open=mazeCourierOpenMask(seed,round);let cell=0;
    for(const direction of path){assert.equal(mazeCourierCanMove(seed,round,cell,direction),true);cell=direction===0?cell-3:direction===1?cell+1:direction===2?cell+3:cell-1;}
    assert.equal(cell,8);assert.equal(newMiniGameScoreRound('maze_courier',mazeCourierEncode(path),round,seed),1);
    assert.equal(newMiniGameScoreRound('maze_courier',mazeCourierEncode([path[0]^1,...path.slice(1)]),round,seed),0);
    assert.ok((open&(1<<8))!==0);
  }
  assert.equal(mazeCourierCanMove(seed,0,0,0),false);
  assert.throws(()=>mazeCourierEncode([1,2,1]),RangeError);
});

test('Cargo Sort assigns three crates to unique bays and grades the complete permutation', () => {
  const seed=4123,permutations=Array.from({length:5},(_,round)=>cargoSortPermutation(seed,round));
  assert.deepEqual(permutations,[[0,2,1],[0,1,2],[2,0,1],[1,0,2],[2,1,0]]);
  permutations.forEach((permutation,round)=>{
    const encoded=cargoSortEncode(permutation);
    assert.equal(newMiniGameScoreRound('cargo_sort',encoded,round,seed),1);
    assert.equal(newMiniGameScoreRound('cargo_sort',encoded^1,round,seed),0);
  });
  assert.throws(()=>cargoSortEncode([0,0,2]),RangeError);
});

test('Orbit Rescue plans three seeded gravity burns and validates the whole trajectory', () => {
  const seed=4123,sequences=Array.from({length:5},(_,round)=>orbitRescueSequence(seed,round));
  assert.deepEqual(sequences,[[3,0,0],[0,3,0],[1,1,3],[1,2,3],[2,1,3]]);
  sequences.forEach((sequence,round)=>{
    const encoded=orbitRescueEncode(sequence);
    assert.equal(newMiniGameScoreRound('orbit_rescue',encoded,round,seed),1);
    assert.equal(newMiniGameScoreRound('orbit_rescue',encoded^1,round,seed),0);
  });
  assert.throws(()=>orbitRescueEncode([0,1]),RangeError);
});

test('Switchstorm derives solvable Lights Out boards and grades the complete press mask', () => {
  const seed=4123, initial=Array.from({length:5},(_,round)=>switchstormInitialMask(seed,round));
  assert.deepEqual(initial,[23,96,282,357,171]);
  assert.equal(switchstormToggleMask(0,4).toString(2).replaceAll('0','').length,5);
  assert.equal(switchstormToggleMask(0,0).toString(2).replaceAll('0','').length,3);
  const solutions=Array.from({length:5},(_,round)=>switchstormSolutionMask(seed,round));
  solutions.forEach((solution,round)=>{
    assert.equal(switchstormBoardMask(seed,round,solution),0);
    assert.equal(newMiniGameScoreRound('switchstorm',solution,round,seed),1);
    assert.equal(newMiniGameScoreRound('switchstorm',solution^1,round,seed),0);
  });
  const invalid={game:'switchstorm',matchId:'m',playerUid:'a',type:'pick',payload:{value:'512',round:0}};
  assert.equal(newMiniGameState([invalid],'switchstorm','m','a','b',seed).round,0);
});

test('Pixel Forge creates a deterministic 4x4 nonogram and scores only the exact filled-cell mask', () => {
  const seed=4123, masks=Array.from({length:5},(_,round)=>pixelForgeTargetMask(seed,round));
  assert.deepEqual(masks,[32626,28662,63281,28662,60559]);
  for(let round=0;round<5;round++){
    assert.equal(pixelForgeTargetMask(seed,round),pixelForgeTargetMask(seed,round));
    assert.equal(newMiniGameScoreRound('pixel_forge',masks[round],round,seed),1);
    assert.equal(newMiniGameScoreRound('pixel_forge',masks[round]^1,round,seed),0);
  }
  const clueCounts=new Map();
  for(let mask=0;mask<65536;mask++)clueCounts.set(nonogramClueKey(mask),(clueCounts.get(nonogramClueKey(mask))||0)+1);
  for(const mask of masks)assert.equal(clueCounts.get(nonogramClueKey(mask)),1,'row/column clues identify exactly one board');
});

test('Echo Wave shows a seeded sequence, encodes every tap in order and rejects a changed rhythm', () => {
  assert.notEqual(echoWaveEncode([3]),echoWaveEncode([3,0]));
  const seed=77;
  for(let round=0;round<5;round++){
    const sequence=echoWaveSequence(seed,round);
    assert.equal(sequence.length,3+Math.min(round,3));
    assert.ok(sequence.every(color=>color>=0&&color<4));
    assert.equal(echoWaveSequence(seed,round).join(','),sequence.join(','));
    assert.equal(newMiniGameScoreRound('echo_wave',echoWaveEncode(sequence),round,seed),1);
    assert.equal(newMiniGameScoreRound('echo_wave',echoWaveEncode(sequence)^1,round,seed),0);
  }
});

function nonogramClueKey(mask){let key='';for(let row=0;row<4;row++){let sum=0;for(let column=0;column<4;column++)sum+=(mask>>(row*4+column))&1;key+=sum;}for(let column=0;column<4;column++){let sum=0;for(let row=0;row<4;row++)sum+=(mask>>(row*4+column))&1;key+=sum;}return key;}

test('ten new mini-games expose distinct catalog entries and bounded deterministic puzzles', () => {
  assert.equal(NEW_MINIGAMES.length, 10);
  assert.equal(new Set(NEW_MINIGAMES.map(([id]) => id)).size, 10);
  for (const [game] of NEW_MINIGAMES) for (let round=0; round<5; round++) {
    const target = newMiniGameTarget(game, round, 4123);
    assert.equal(target, newMiniGameTarget(game, round, 4123));
    assert.ok(target >= 0);
  }
  assert.deepEqual(NEW_MINIGAMES.map(([game])=>Array.from({length:5},(_,round)=>newMiniGameTarget(game,round,4123))),[
    [3,2,0,2,1],[3,2,4,6,5],[0,3,1,3,2],[0,3,1,3,2],[0,4,1,3,2],
    [0,3,1,3,2],[1,0,2,0,3],[3,2,0,2,1],[1,0,2,0,3],[1,0,2,4,3]
  ]);
});

test('new mini-game reducer replays independent player rounds and timeout misses consistently', () => {
  const game='prism_relay',seed=20,matchId='m',moves=[];
  for(let round=0;round<5;round++){
    moves.push({game,matchId,playerUid:'a',type:'pick',payload:{value:String(prismRelaySolutionMask(seed,round)),round}});
    if(round<4)moves.push({game,matchId,playerUid:'b',type:'pick',payload:{value:'TIMEOUT',round}});
  }
  const pending=newMiniGameState(moves,game,matchId,'a','b',seed);
  assert.equal(pending.complete,false);
  moves.push({game,matchId,playerUid:'b',type:'pick',payload:{value:'TIMEOUT',round:4}});
  const finished=newMiniGameState(moves,game,matchId,'a','b',seed);
  assert.deepEqual([finished.complete,finished.ownScore,finished.otherScore,finished.winnerUid],[true,5,0,'a']);
  assert.throws(()=>newMiniGameTarget('missing',0,0),RangeError);
});

test('Tower Balance rewards stable near-balance placements and Comet Curling grades shot accuracy', () => {
  assert.deepEqual([0,1,2,3,4].map(answer=>newMiniGameRoundScore('tower_balance',answer,2)),[0,1,1,1,0]);
  assert.deepEqual([0,1,2,3,4].map(answer=>newMiniGameRoundScore('comet_curling',answer,2)),[0,1,2,1,0]);
  assert.equal(newMiniGameMaxScore('tower_balance'),5);
  assert.equal(newMiniGameMaxScore('comet_curling'),10);
  const game='comet_curling',seed=4123,matchId='shots',moves=[];
  for(let round=0;round<5;round++) for(const playerUid of ['a','b']) {
    const target=newMiniGameTarget(game,round,seed);
    moves.push({game,matchId,playerUid,type:'pick',payload:{round,value:String(playerUid==='a'?target:Math.max(0,target-2))}});
  }
  const state=newMiniGameState(moves,game,matchId,'a','b',seed);
  assert.equal(state.maxScore,10);
  assert.ok(state.ownScore>state.otherScore);
});

test('new mini-game reducer rejects duplicate, skipped and out-of-range inputs and honors rematch reset', () => {
  const game='switchstorm',matchId='m',seed=76;
  const moves=[
    {game,matchId,playerUid:'a',type:'pick',payload:{round:0,value:'512'}},
    {game,matchId,playerUid:'a',type:'pick',payload:{round:1,value:'0'}},
    {game,matchId,playerUid:'a',type:'pick',payload:{round:0,value:String(newMiniGameTarget(game,0,seed))}},
  ];
  assert.equal(newMiniGameState(moves,game,matchId,'a','b',seed).round,1);
  const valid=[{game,matchId,playerUid:'a',type:'pick',payload:{round:0,value:String(switchstormSolutionMask(seed,0))}}];
  for(let round=0;round<5;round++){
    for(const playerUid of ['a','b']) valid.push({game,matchId,playerUid,type:'pick',payload:{round,value:String(switchstormSolutionMask(seed,round))}});
  }
  const finished=newMiniGameState(valid,game,matchId,'a','b',seed);
  assert.equal(finished.complete,true);
  assert.equal(finished.ownScore,5);
  const rematch=[...valid,{game,matchId,type:'reset'}, {game,matchId,playerUid:'a',type:'pick',payload:{round:0,value:'TIMEOUT'}}];
  const restarted=newMiniGameState(rematch,game,matchId,'a','b',seed);
  assert.deepEqual([restarted.round,restarted.otherRound,restarted.ownScore,restarted.complete],[1,0,0,false]);
});

test('two virtual clients replay every new game to the same winner from opposite seats', () => {
  for(const [game] of NEW_MINIGAMES){
    const matchId=`match-${game}`,seed=hash(game),moves=[];
    for(let round=0;round<5;round++){
      const answer=game==='prism_relay'?prismRelaySolutionMask(seed,round):game==='maze_courier'?mazeCourierEncode(mazeCourierPath(seed,round)):game==='cargo_sort'?cargoSortEncode(cargoSortPermutation(seed,round)):game==='orbit_rescue'?orbitRescueEncode(orbitRescueSequence(seed,round)):game==='switchstorm'?switchstormSolutionMask(seed,round):game==='pixel_forge'?pixelForgeTargetMask(seed,round):game==='echo_wave'?echoWaveEncode(echoWaveSequence(seed,round)):newMiniGameTarget(game,round,seed);
      moves.push({game,matchId,playerUid:'host',type:'pick',payload:{round,value:String(answer)}});
      moves.push({game,matchId,playerUid:'guest',type:'pick',payload:{round,value:'TIMEOUT'}});
    }
    const host=newMiniGameState(moves,game,matchId,'host','guest',seed);
    const guest=newMiniGameState(moves,game,matchId,'guest','host',seed);
    assert.equal(host.complete,true,game);
    assert.equal(guest.complete,true,game);
    assert.equal(host.winnerUid,'host',game);
    assert.equal(guest.winnerUid,'host',game);
    assert.deepEqual([host.ownScore,host.otherScore],[guest.otherScore,guest.ownScore],game);
  }
});

function hash(value){let result=0;for(const char of value)result=Math.imul(result,31)+char.charCodeAt(0)|0;return result}
