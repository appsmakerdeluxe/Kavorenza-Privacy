import { getWebLanguage } from './web-i18n.js';
import { DILEMMA_TRANSLATIONS } from './dilemma-translations.js';

export const MEMORY_TURN_TIMEOUT_SECONDS = 15;
export const NEW_MINIGAME_ECHO_REVEAL_MS = 1_800;
export const NEW_MINIGAME_ROUND_TIMEOUT_MS = 15_000;
export function newMiniGameRoundStartedAtMs(ownMoves, matchStartedAt, nowMs = Date.now()) {
  const latest = ownMoves.at(-1)?.createdAt;
  const lastMoveAt = latest?.toMillis?.() ?? Number(latest);
  const matchAt = matchStartedAt?.toMillis?.() ?? Number(matchStartedAt);
  return Number.isFinite(lastMoveAt) && lastMoveAt > 0 ? lastMoveAt
    : Number.isFinite(matchAt) && matchAt > 0 ? matchAt
      : nowMs;
}
export function newMiniGameRemainingMs(startedAtMs, nowMs = Date.now()) {
  return Math.max(0, NEW_MINIGAME_ROUND_TIMEOUT_MS - Math.max(0, nowMs - startedAtMs));
}
export function switchstormToggleMask(mask, cell) {
  if (!Number.isInteger(cell) || cell < 0 || cell > 8) throw new RangeError('Switchstorm cell must be 0..8');
  const row = Math.floor(cell / 3), column = cell % 3;
  let result = mask ^ (1 << cell);
  if (row > 0) result ^= 1 << (cell - 3);
  if (row < 2) result ^= 1 << (cell + 3);
  if (column > 0) result ^= 1 << (cell - 1);
  if (column < 2) result ^= 1 << (cell + 1);
  return result;
}
export function switchstormSolutionMask(seed, round) {
  if (!Number.isInteger(round) || round < 0) throw new RangeError('Switchstorm round must be non-negative');
  let state = (seed | 0) ^ Math.imul(round + 1, 0x45d9f3b), mask = 0;
  const scrambleCount = 3 + ((state >>> 1) & 3);
  for (let step = 0; step < scrambleCount; step++) {
    state = (Math.imul(state, 1_664_525) + 1_013_904_223) | 0;
    mask ^= 1 << ((state >>> 16) % 9);
  }
  if (mask === 0) mask = 1 << (((seed | 0) >>> (round % 16)) % 9);
  return mask;
}
export function switchstormInitialMask(seed, round) {
  let board = 0;
  const presses = switchstormSolutionMask(seed, round);
  for (let cell = 0; cell < 9; cell++) if (presses & (1 << cell)) board = switchstormToggleMask(board, cell);
  return board;
}
export function switchstormBoardMask(seed, round, pressedMask) {
  let board = switchstormInitialMask(seed, round);
  for (let cell = 0; cell < 9; cell++) if ((pressedMask & (1 << cell)) !== 0) board = switchstormToggleMask(board, cell);
  return board;
}
export function pixelForgeTargetMask(seed, round) {
  const patterns=[[0b0110,0b1111,0b1111,0b0110],[0b0010,0b0111,0b1111,0b0111],[0b0001,0b0011,0b0111,0b1111],[0b1111,0b1000,0b1100,0b1110]];
  const rows=patterns[newMiniGameTarget('pixel_forge',round,seed)];
  let mask=0;
  rows.forEach((bits,row)=>{for(let column=0;column<4;column++)if(bits&(1<<column))mask|=1<<(row*4+column);});
  return mask;
}
export function echoWaveSequence(seed, round) {
  if (!Number.isInteger(round) || round < 0) throw new RangeError('Echo Wave round must be non-negative');
  let state = (seed | 0) ^ Math.imul(round + 1, 0x27d4eb2d);
  return Array.from({length:3+Math.min(round,3)},()=>{state=(Math.imul(state,1_664_525)+1_013_904_223)|0;return (state>>>16)&3;});
}
export function echoWaveEncode(sequence) {
  if(!Array.isArray(sequence)||sequence.length<1||sequence.length>6||sequence.some(color=>!Number.isInteger(color)||color<0||color>3))throw new RangeError('Echo Wave sequence must contain 1..6 colors');
  return (1<<(sequence.length*2))+sequence.reduce((value,color,index)=>value+(color<<(index*2)),0);
}
export function prismRelayUsesUpperRoute(seed,round){return newMiniGameTarget('prism_relay',round,seed)%2===0;}
export function prismRelaySolutionMask(seed,round){return prismRelayUsesUpperRoute(seed,round)?12:3;}
export function prismRelayReachesGoal(seed,round,orientationMask){
  if(!Number.isInteger(orientationMask)||orientationMask<0||orientationMask>15)return false;
  const upper=prismRelayUsesUpperRoute(seed,round),mirrors=upper?[[3,0],[0,1],[2,2],[5,3]]:[[3,0],[6,1],[8,2],[5,3]],slots=new Map(mirrors.map(([cell,slot])=>[cell,slot]));
  let row=1,column=-1,direction=1;const visited=new Set();
  for(let step=0;step<24;step++){
    if(direction===0)row--;else if(direction===1)column++;else if(direction===2)row++;else column--;
    if(row===1&&column===3)return true;
    if(row<0||row>2||column<0||column>2||row===1&&column===1)return false;
    const cell=row*3+column,slot=slots.get(cell);
    if(slot!==undefined){const key=`${cell}:${direction}`;if(visited.has(key))return false;visited.add(key);const backslash=(orientationMask&(1<<slot))!==0;direction=backslash?[3,2,1,0][direction]:[1,0,3,2][direction];}
  }
  return false;
}
export function mazeCourierPath(seed,round){return [[1,2,1,2],[2,1,2,1],[1,1,2,2],[2,2,1,1]][newMiniGameTarget('maze_courier',round,seed)];}
export function mazeCourierEncode(path){if(!Array.isArray(path)||path.length!==4||path.some(direction=>!Number.isInteger(direction)||direction<0||direction>3))throw new RangeError('Maze Courier path must contain four directions');return path.reduce((value,direction,index)=>value+(direction<<(index*2)),0);}
export function mazeCourierOpenMask(seed,round){let row=0,column=0,mask=1;for(const direction of mazeCourierPath(seed,round)){if(direction===0)row--;else if(direction===1)column++;else if(direction===2)row++;else column--;mask|=1<<(row*3+column);}return mask;}
export function mazeCourierCanMove(seed,round,cell,direction){if(!Number.isInteger(cell)||cell<0||cell>8||!Number.isInteger(direction)||direction<0||direction>3)return false;const row=Math.floor(cell/3),column=cell%3,next=direction===0?row>0?cell-3:-1:direction===1?column<2?cell+1:-1:direction===2?row<2?cell+3:-1:column>0?cell-1:-1;return next>=0&&(mazeCourierOpenMask(seed,round)&(1<<next))!==0;}
export function cargoSortPermutation(seed,round){if(!Number.isInteger(round)||round<0)throw new RangeError('Cargo Sort round must be non-negative');return [[0,1,2],[0,2,1],[1,0,2],[1,2,0],[2,0,1],[2,1,0]][(((seed|0)>>> (round%16))+round*3)%6];}
export function cargoSortEncode(permutation){if(!Array.isArray(permutation)||permutation.length!==3||new Set(permutation).size!==3||permutation.some(bay=>!Number.isInteger(bay)||bay<0||bay>2))throw new RangeError('Cargo Sort requires a permutation of bays 0..2');return permutation.reduce((value,bay,index)=>value|(bay<<(index*2)),0);}
export function orbitRescueSequence(seed,round){if(!Number.isInteger(round)||round<0)throw new RangeError('Orbit Rescue round must be non-negative');let state=(seed|0)^Math.imul(round+1,0x145d39e5);return Array.from({length:3},()=>{state=(Math.imul(state,1_664_525)+1_013_904_223)|0;return(state>>>16)&3;});}
export function orbitRescueEncode(burns){if(!Array.isArray(burns)||burns.length!==3||burns.some(value=>!Number.isInteger(value)||value<0||value>3))throw new RangeError('Orbit Rescue requires three burns');return burns.reduce((value,burn,index)=>value|(burn<<(index*2)),0);}

export const NEW_MINIGAMES = Object.freeze([
  ['prism_relay','🔺','Prismen-Relay','Leite den Laser um den mittleren Blocker bis zum Empfänger.'],
  ['switchstorm','⚡','Schaltersturm','Schalte das 3×3-Raster aus; jeder Schalter kippt sich und seine Nachbarn.'],
  ['shape_shift','◈','Formen-Shift','Drehe die Form in 90°-Schritten zur Ziel-Silhouette.'],
  ['maze_courier','🧭','Labyrinth-Kurier','Wähle Zug für Zug den sicheren Weg durch das Labyrinth.'],
  ['tower_balance','⚖️','Turm-Balance','Halte die Wippe mit dem passenden Gewicht im Gleichgewicht.'],
  ['cargo_sort','📦','Fracht-Sortierer','Sortiere jede Kiste in den passenden Frachtraum.'],
  ['pixel_forge','▦','Pixel-Schmiede','Löse ein 4×4-Nonogramm anhand von Zeilen- und Spaltenhinweisen.'],
  ['echo_wave','〰️','Echo-Welle','Merke dir die Lichtfolge und wiederhole sie.'],
  ['orbit_rescue','🪐','Orbit-Rettung','Lenke die Sonde mit einem Impuls in die sichere Umlaufbahn.'],
  ['comet_curling','☄️','Kometen-Curling','Wähle den Schub, der den Kometen am Ziel landen lässt.'],
]);
const NEW_MINIGAME_LENGTHS = [4,9,4,4,5,4,4,4,4,5];
const NEW_MINIGAME_BASES = [0,0,1,1,2,1,2,0,2,3];
export function newMiniGameTarget(game, round, seed) {
  const index = NEW_MINIGAMES.findIndex(([id]) => id === game);
  if (index < 0 || !Number.isInteger(round) || round < 0) throw new RangeError('Unknown game or invalid round');
  return (NEW_MINIGAME_BASES[index] + ((seed | 0) >>> (round % 16) & 3) + round) % NEW_MINIGAME_LENGTHS[index];
}
export function newMiniGameMaxScore(game) {
  if (!NEW_MINIGAMES.some(([id]) => id === game)) throw new RangeError('Unknown mini-game');
  return game === 'comet_curling' ? 10 : 5;
}
export function newMiniGameRoundScore(game, answer, target) {
  if (answer == null) return 0;
  const distance = Math.abs(answer - target);
  if (game === 'tower_balance') return distance <= 1 ? 1 : 0;
  if (game === 'comet_curling') return Math.max(0, 2 - distance);
  return distance === 0 ? 1 : 0;
}
export function newMiniGameScoreRound(game, answer, round, seed) {
  if (game === 'prism_relay') return prismRelayReachesGoal(seed,round,answer)?1:0;
  if (game === 'maze_courier') return answer===mazeCourierEncode(mazeCourierPath(seed,round))?1:0;
  if (game === 'cargo_sort') return answer===cargoSortEncode(cargoSortPermutation(seed,round))?1:0;
  if (game === 'orbit_rescue') return answer===orbitRescueEncode(orbitRescueSequence(seed,round))?1:0;
  if (game === 'switchstorm') return Number.isInteger(answer) && answer >= 0 && answer <= 511 && switchstormBoardMask(seed, round, answer) === 0 ? 1 : 0;
  if (game === 'pixel_forge') return answer === pixelForgeTargetMask(seed,round) ? 1 : 0;
  if (game === 'echo_wave') return answer === echoWaveEncode(echoWaveSequence(seed,round)) ? 1 : 0;
  return newMiniGameRoundScore(game, answer, newMiniGameTarget(game, round, seed));
}
export function newMiniGameState(moves, game, matchId, uid, opponentUid, seed) {
  if (!NEW_MINIGAMES.some(([id]) => id === game)) throw new RangeError('Unknown mini-game');
  const scoped = moves.filter(move => move.game === game && move.matchId === matchId);
  const resetIndex = scoped.findLastIndex(move => move.type === 'reset');
  const picks = scoped.slice(resetIndex + 1).filter(move => move.type === 'pick');
  const accept = playerUid => {
    const accepted=[];
    for(const move of picks.filter(item=>item.playerUid===playerUid)){
      if(accepted.length>=5)break;
      const round=move.payload?.round??accepted.length,value=move.payload?.value;
      const valueLimit=game==='prism_relay'?16:game==='maze_courier'?256:game==='cargo_sort'||game==='orbit_rescue'?64:game==='switchstorm'?512:game==='pixel_forge'?65536:game==='echo_wave'?8192:NEW_MINIGAME_LENGTHS[NEW_MINIGAMES.findIndex(([id])=>id===game)];
      const valid=value==='TIMEOUT'||typeof value==='string'&&/^\d+$/.test(value)&&Number(value)<valueLimit;
      if(Number.isInteger(round)&&round===accepted.length&&valid)accepted.push(move);
    }
    return accepted;
  };
  const own = accept(uid),other = accept(opponentUid);
  const score = list => list.slice(0,5).reduce((sum,move,index) => sum + newMiniGameScoreRound(game, move.payload?.value === 'TIMEOUT' ? null : Number(move.payload?.value), index, seed),0);
  const ownScore=score(own),otherScore=score(other),complete=own.length>=5&&other.length>=5;
  return { round:Math.min(own.length,5),otherRound:Math.min(other.length,5),ownScore,otherScore,maxScore:newMiniGameMaxScore(game),answered:own.length>other.length||own.length>=5,complete,winnerUid:!complete||ownScore===otherScore?null:ownScore>otherScore?uid:opponentUid };
}

const TTT_LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];
const DILEMMAS = [
  ['Nie wieder Pizza essen','Nie wieder Burger essen'], ['Fliegen können','Unsichtbar sein können'],
  ['Immer 10 Minuten zu früh sein','Immer 20 Minuten zu spät sein'], ['Gedanken lesen können','In die Zukunft sehen'],
  ['1 Jahr ohne Smartphone leben','1 Jahr ohne Freunde treffen'], ['Auf einer einsamen Insel stranden','In einer Zombie-Apokalypse leben'],
  ['Jedes Geheimnis von allen kennen','Dass niemand je dein Geheimnis erfährt'], ['Für immer Hochsommer mit 35 °C','Für immer Winter mit Schnee bei −5 °C'],
  ['Superstark sein','Superschnell sein'], ['Immer die Wahrheit sagen müssen','Niemals mehr sprechen können'],
  ['Weltberühmter Rockstar sein','Geheimer Multimillionär sein'], ['Nur noch rückwärts laufen','Nur noch auf einem Bein hüpfen'],
  ['Einen extremen Bungee-Sprung wagen','Mit Haien tauchen'], ['Alles schmeckt nach Schokolade','Alles schmeckt nach Pommes'],
  ['Die Zeit komplett anhalten können','Die Zeit 10 Minuten zurückdrehen können'], ['500.000 € sofort bekommen','Jeden Tag lebenslang 150 € bekommen'],
  ['Nie wieder schlafen müssen','Nie wieder arbeiten müssen'], ['Mit allen Tieren sprechen können','Alle Sprachen fließend sprechen'],
  ['Für immer kostenlos überallhin fliegen','Für immer kostenlos in jedem Restaurant essen'], ['Nie wieder Sonnenbrand bekommen','Nie wieder Mückenstiche bekommen'],
  ['Nie wieder Musik hören','Nie wieder Filme oder Serien schauen'], ['Immer wissen, wenn dich jemand anlügt','Perfekt lügen können'],
  ['Ein Jahr ins All fliegen','Ein Jahr auf dem Meeresgrund leben'], ['Überallhin teleportieren können','Gegenstände mit Gedanken bewegen können'],
  ['Immer 100 % Akku auf allen Geräten haben','Überall ultraschnelles Gratis-WLAN haben'], ['Immer barfuß laufen müssen','Immer einen Wintermantel tragen müssen'],
  ['Jeden Tag deinen Lieblingssong hören','Nie wieder Musik mit Gesang hören'], ['10 Jahre in die Vergangenheit reisen','20 Jahre in die Zukunft reisen'],
  ['Ab 25 nie wieder körperlich altern','Jedes Buch sofort auswendig können'], ['Die Gedanken deines Partners hören','Dein Partner hört immer deine Gedanken'],
  ['Für immer auf Kaffee verzichten','Für immer auf Schokolade verzichten'], ['Ein berühmter Erfinder sein','Ein gefeierter Sport-Champion sein'],
  ['Für immer in einem Luxushotel wohnen','Ein riesiges Haus im abgelegenen Wald haben'], ['Niemals mehr frieren','Niemals mehr schwitzen'],
  ['Unter Wasser atmen können','Mit 200 km/h rennen können'], ['Dein Haustier kann sprechen','Die Gefühle aller Menschen spüren'],
];

// Must match GameRules.SeededRandom and GameRules.seededShuffle on Android.

export function seededIndices(seed, count, bound) {
  if (!Number.isInteger(count) || count < 0 || !Number.isInteger(bound) || bound <= 0) throw new RangeError('count and bound must be positive integers');
  let state = seed | 0;
  return Array.from({ length: count }, () => {
    state = Math.imul(state, 1664525) + 1013904223 | 0;
    return Math.floor(((state >>> 0) * bound) / 0x1_0000_0000);
  });
}

export function seededShuffle(values, seed) {
  const shuffled = [...values];
  let state = seed | 0;
  for (let index = shuffled.length - 1; index > 0; index--) {
    state = Math.imul(state, 1664525) + 1013904223 | 0;
    const other = Math.floor(((state >>> 0) * (index + 1)) / 0x1_0000_0000);
    [shuffled[index], shuffled[other]] = [shuffled[other], shuffled[index]];
  }
  return shuffled;
}

export function numberTargetPuzzle(seed, round) {
  let state = (seed ^ Math.imul(round, 0x45D9F3B)) | 0;
  const nextInt = bound => {
    state = Math.imul(state, 1664525) + 1013904223 | 0;
    return Math.floor(((state >>> 0) * bound) / 0x1_0000_0000);
  };
  const target = nextInt(16) + 9;
  const expressions = new Map();
  for (let a = 2; a <= 12; a++) for (let b = 2; b <= 12; b++) {
    expressions.set(`${a} + ${b} = ${a + b}`, a + b);
    if (a > b) expressions.set(`${a} − ${b} = ${a - b}`, a - b);
    expressions.set(`${a} × ${b} = ${a * b}`, a * b);
  }
  const ranked = [...expressions].map(([expression, result]) => ({ expression, result }))
    .sort((left, right) => Math.abs(left.result - target) - Math.abs(right.result - target) || (left.expression < right.expression ? -1 : left.expression > right.expression ? 1 : 0));
  const best = ranked[0];
  const distractors = ranked.slice(1).map((_, index) => index);
  for (let index = distractors.length - 1; index > 0; index--) {
    const other = nextInt(index + 1);
    [distractors[index], distractors[other]] = [distractors[other], distractors[index]];
  }
  const options = [best, ...distractors.slice(0, 3).map(index => ranked[index + 1])];
  for (let index = options.length - 1; index > 0; index--) {
    const other = nextInt(index + 1);
    [options[index], options[other]] = [options[other], options[index]];
  }
  return { target, options, bestExpression: best.expression };
}

export function colorRushRounds(isGerman, seed, language = getWebLanguage()) {
  const labels = ({
    de: ['CYAN TIPPEN', 'PINK TIPPEN', 'MINZE TIPPEN', 'BERNSTEIN TIPPEN', 'VIOLETT TIPPEN'],
    en: ['TAP CYAN', 'TAP PINK', 'TAP MINT', 'TAP AMBER', 'TAP VIOLET'],
    es: ['TOCA CIAN', 'TOCA ROSA', 'TOCA MENTA', 'TOCA ÁMBAR', 'TOCA VIOLETA'],
    fr: ['TOUCHE CYAN', 'TOUCHE ROSE', 'TOUCHE MENTHE', 'TOUCHE AMBRE', 'TOUCHE VIOLET'],
    it: ['TOCCA CIANO', 'TOCCA ROSA', 'TOCCA MENTA', 'TOCCA AMBRA', 'TOCCA VIOLA'],
  })[language] || (isGerman
    ? ['CYAN TIPPEN', 'PINK TIPPEN', 'MINZE TIPPEN', 'BERNSTEIN TIPPEN', 'VIOLETT TIPPEN']
    : ['TAP CYAN', 'TAP PINK', 'TAP MINT', 'TAP AMBER', 'TAP VIOLET']);
  const colors = ['CYAN', 'PINK', 'MINT', 'AMBER', 'VIOLET'];
  return seededIndices(seed, 5, labels.length).map(index => [labels[index], colors[index]]);
}

export function wordSprintRounds(isGerman, seed, language = getWebLanguage()) {
  const roundsByLanguage = {
    de: [['NACHT', ['NACHT', 'LICHT', 'RAUM', 'DUELL']], ['BLITZ', ['DONNER', 'BLITZ', 'REGEN', 'SONNE']], ['STERN', ['MOND', 'STERN', 'SONNE', 'PLANET']], ['FEUER', ['WASSER', 'FEUER', 'ERDE', 'LUFT']], ['SIEG', ['SPIEL', 'RUNDE', 'SIEG', 'PUNKT']]],
    en: [['NIGHT', ['NIGHT', 'LIGHT', 'SPACE', 'DUEL']], ['FLASH', ['THUNDER', 'FLASH', 'RAIN', 'SOLAR']], ['STAR', ['MOON', 'STAR', 'SUN', 'PLANET']], ['FIRE', ['WATER', 'FIRE', 'EARTH', 'WIND']], ['VICTORY', ['MATCH', 'ROUND', 'VICTORY', 'POINT']]],
    es: [['NOCHE', ['NOCHE', 'LUZ', 'ESPACIO', 'DUELO']], ['RAYO', ['TRUENO', 'RAYO', 'LLUVIA', 'SOL']], ['ESTRELLA', ['LUNA', 'ESTRELLA', 'SOL', 'PLANETA']], ['FUEGO', ['AGUA', 'FUEGO', 'TIERRA', 'AIRE']], ['VICTORIA', ['PARTIDA', 'RONDA', 'VICTORIA', 'PUNTO']]],
    fr: [['NUIT', ['NUIT', 'LUMIÈRE', 'ESPACE', 'DUEL']], ['ÉCLAIR', ['TONNERRE', 'ÉCLAIR', 'PLUIE', 'SOLEIL']], ['ÉTOILE', ['LUNE', 'ÉTOILE', 'SOLEIL', 'PLANÈTE']], ['FEU', ['EAU', 'FEU', 'TERRE', 'AIR']], ['VICTOIRE', ['MATCH', 'MANCHE', 'VICTOIRE', 'POINT']]],
    it: [['NOTTE', ['NOTTE', 'LUCE', 'SPAZIO', 'DUELLO']], ['LAMPO', ['TUONO', 'LAMPO', 'PIOGGIA', 'SOLE']], ['STELLA', ['LUNA', 'STELLA', 'SOLE', 'PIANETA']], ['FUOCO', ['ACQUA', 'FUOCO', 'TERRA', 'ARIA']], ['VITTORIA', ['PARTITA', 'ROUND', 'VITTORIA', 'PUNTO']]],
  };
  const rounds = roundsByLanguage[language] || (isGerman ? roundsByLanguage.de : roundsByLanguage.en);
  return seededShuffle(rounds, seed);
}

export function emojiMemoryBoard(seed) {
  return seededShuffle(['⚡', '⚡', '🌟', '🌟', '🔥', '🔥', '💎', '💎', '👾', '👾', '🚀', '🚀'], seed);
}

export function arcadeRunState(moves, game, matchId, localUid) {
  const picks = currentRound(moves, game, matchId).filter(move => move.type === 'pick');
  const own = picks.filter(move => move.playerUid === localUid);
  const other = picks.filter(move => move.playerUid !== localUid);
  const scoreOf = list => list.reduce((total, move) => total + (Number(move.payload?.value?.split?.(';')?.[1]) || 0), 0);
  return { own, other, round: own.length, ownScore: scoreOf(own), otherScore: scoreOf(other), complete: own.length >= 5 && other.length >= 5 };
}

export function emojiMemoryState(moves, matchId, roomCode, hostUid, guestUid, localUid) {
  const board = emojiMemoryBoard(kotlinStringHash(roomCode || 'KAVO'));
  const picks = currentRound(moves, 'emoji_memory', matchId).filter(move => move.type === 'pick');
  const matched = new Set();
  let nextPlayerUid = hostUid;
  let visible = [];
  let pending = [];
  let pendingPlayerUid = null;
  let turns = 0;
  let turnNumber = 0;
  let turnStartedAt = null;
  let hostPairs = 0, guestPairs = 0;
  const eventTime = pick => pick.createdAt?.toMillis?.() || Number(pick.createdAt) || null;
  const passTurn = pick => { nextPlayerUid = nextPlayerUid === hostUid ? guestUid : hostUid; visible = []; pending = []; pendingPlayerUid = null; turnNumber++; turnStartedAt = eventTime(pick) || turnStartedAt; };
  const reveal = (uid, index) => {
    if (uid !== nextPlayerUid || pending.length >= 2 || !Number.isInteger(index) || index < 0 || index >= board.length || matched.has(index) || pending.includes(index)) return false;
    pending = [...pending, index]; visible = pending; pendingPlayerUid = uid; return true;
  };
  const resolve = pick => {
    if (pending.length !== 2) return;
    turns++;
    const scorer = pendingPlayerUid;
    if (board[pending[0]] === board[pending[1]]) {
      pending.forEach(index => matched.add(index));
      if (scorer === hostUid) hostPairs++; else guestPairs++;
      pending = []; visible = []; pendingPlayerUid = null; turnNumber++; turnStartedAt = eventTime(pick) || turnStartedAt;
    } else passTurn(pick);
  };
  for (const pick of picks) {
    const value = pick.payload?.value || '';
    if (value === 'TIMEOUT' && pick.playerUid === nextPlayerUid) {
      passTurn(pick);
      continue;
    }
    if (value.startsWith('TIMEOUT:')) {
      if (value.slice('TIMEOUT:'.length) !== nextPlayerUid || ![hostUid, guestUid].includes(pick.playerUid)) continue;
      passTurn(pick);
      continue;
    }
    if (value === 'resolve') { resolve(pick); continue; }
    if (value.startsWith('card:')) { reveal(pick.playerUid, Number(value.slice(5))); continue; }
    // Read old pair events while Android/browser clients roll forward.
    if (value.startsWith('pair:') && pick.playerUid === nextPlayerUid) {
      const cells = value.slice(5).split(',').map(Number);
      if (cells.length === 2 && cells[0] !== cells[1] && cells.every(index => Number.isInteger(index) && index >= 0 && index < board.length && !matched.has(index))) {
        turns++; visible = cells;
        if (board[cells[0]] === board[cells[1]]) {
          cells.forEach(index => matched.add(index));
          if (pick.playerUid === hostUid) hostPairs++; else guestPairs++;
        } else nextPlayerUid = nextPlayerUid === hostUid ? guestUid : hostUid;
        turnNumber++; turnStartedAt = eventTime(pick) || turnStartedAt;
      }
    }
  }
  const ownPairs = localUid === hostUid ? hostPairs : guestPairs;
  const otherPairs = localUid === hostUid ? guestPairs : hostPairs;
  return { board, picks, matched: [...matched], visible, pending, pendingPlayerUid, nextPlayerUid, ownPairs, otherPairs, turns, turnNumber, turnStartedAt, complete: matched.size === 12 || turns >= 24 };
}

function kotlinStringHash(value) {
  let hash = 0;
  for (const char of value) hash = Math.imul(hash, 31) + char.codePointAt(0) | 0;
  return hash;
}

function currentRound(moves, game, matchId) {
  const scoped = moves.filter(move => move.game === game && move.matchId === matchId);
  const reset = scoped.findLastIndex(move => move.type === 'reset');
  return scoped.slice(reset + 1);
}

export function ticTacToeState(moves, matchId, hostUid, guestUid) {
  const actions = currentRound(moves, 'tic_tac_toe', matchId)
    .filter(move => move.type === 'move' || move.type === 'timeout');
  const board = Array(9).fill('');
  actions.forEach((move, index) => {
    const cell = Number(move.payload?.cell);
    if (move.type === 'move' && Number.isInteger(cell) && cell >= 0 && cell < 9 && !board[cell]) {
      board[cell] = index % 2 ? 'O' : 'X';
    }
  });
  const winningLine = TTT_LINES.find(line => board[line[0]] && line.every(cell => board[cell] === board[line[0]])) || null;
  const winner = winningLine ? board[winningLine[0]] : null;
  return {
    actions: actions.length,
    board,
    winningLine,
    winner,
    draw: !winner && board.every(Boolean),
    currentPlayerUid: actions.length % 2 ? guestUid : hostUid,
  };
}

export function connectFourState(moves, matchId, hostUid, guestUid) {
  const actions = currentRound(moves, 'connect_four', matchId)
    .filter(move => move.type === 'move' || move.type === 'timeout');
  const board = Array(42).fill(0);
  actions.forEach((move, index) => {
    const column = Number(move.payload?.column);
    if (move.type !== 'move' || !Number.isInteger(column) || column < 0 || column > 6) return;
    for (let row = 5; row >= 0; row--) {
      const cell = row * 7 + column;
      if (board[cell] === 0) {
        board[cell] = index % 2 ? 2 : 1;
        break;
      }
    }
  });
  let winningCells = null;
  for (let row = 0; row < 6 && !winningCells; row++) {
    for (let column = 0; column < 7 && !winningCells; column++) {
      for (const [dr, dc] of [[0, 1], [1, 0], [1, 1], [1, -1]]) {
        const endRow = row + dr * 3, endColumn = column + dc * 3;
        if (endRow < 0 || endRow >= 6 || endColumn < 0 || endColumn >= 7) continue;
        const line = Array.from({ length: 4 }, (_, index) => (row + dr * index) * 7 + column + dc * index);
        if (board[line[0]] !== 0 && line.every(cell => board[cell] === board[line[0]])) {
          winningCells = line;
          break;
        }
      }
    }
  }
  const winner = winningCells ? board[winningCells[0]] : 0;
  return {
    actions: actions.length,
    board,
    winningCells,
    winner,
    draw: winner === 0 && board.every(cell => cell !== 0),
    currentPlayerUid: actions.length % 2 ? guestUid : hostUid,
  };
}

export function rockPaperState(moves, matchId, localUid) {
  const picks = currentRound(moves, 'rock_paper', matchId).filter(move => move.type === 'pick');
  const mine = picks.findLast(move => move.playerUid === localUid)?.payload?.value ?? null;
  const theirs = picks.findLast(move => move.playerUid !== localUid)?.payload?.value ?? null;
  let winner = null;
  if (mine !== null && theirs !== null) {
    if (mine === theirs) winner = 0;
    else if (mine === 'TIMEOUT') winner = 2;
    else if (theirs === 'TIMEOUT') winner = 1;
    else if (mine === 'ROCK') winner = theirs === 'GLOW' || theirs === 'SCISSORS' ? 1 : 2;
    else if (mine === 'PAPER') winner = theirs === 'ROCK' ? 1 : 2;
    else winner = theirs === 'PAPER' ? 1 : 2;
  }
  return { picks, mine, theirs, winner, complete: mine !== null && theirs !== null };
}

export function chooserState(moves, matchId) {
  const events = currentRound(moves, 'chooser', matchId)
    .filter(move => move.type === 'hold' || move.type === 'release' || move.type === 'decide');
  const latest = new Map();
  for (const move of events) {
    if (move.type === 'hold' || move.type === 'release') latest.set(move.playerUid, move);
  }
  const heldUids = [...latest.values()].filter(move => move.type === 'hold').map(move => move.playerUid);
  const decision = events.findLast(move => move.type === 'decide') || null;
  return { heldUids, bothHolding: heldUids.length === 2, winnerUid: decision?.payload?.winnerUid || null };
}

export function reflexState(moves, matchId, hostUid, guestUid) {
  const round = currentRound(moves, 'reflex', matchId);
  const readyUids = [...new Set(round.filter(move => move.type === 'ready').map(move => move.playerUid))];
  const goMove = round.find(move => move.type === 'go') || null;
  const goTime = Number(goMove?.payload?.time) || 0;
  const taps = round.filter(move => move.type === 'tap');
  const tapByPlayer = new Map();
  for (const tap of taps) if (!tapByPlayer.has(tap.playerUid)) tapByPlayer.set(tap.playerUid, tap);
  const tapFor = (playerUid) => tapByPlayer.get(playerUid) || null;
  const hostTap = tapFor(hostUid), guestTap = tapFor(guestUid);
  const hostFalseStart = hostTap?.payload?.falseStart === true;
  const guestFalseStart = guestTap?.payload?.falseStart === true;
  const reaction = (tap) => {
    const time = Number(tap?.payload?.time);
    return goTime > 0 && Number.isFinite(time) && time >= goTime ? time - goTime : null;
  };
  const hostMs = reaction(hostTap), guestMs = reaction(guestTap);
  let winnerUid = null, isTie = false;
  if (hostFalseStart && guestFalseStart) isTie = true;
  else if (hostFalseStart) winnerUid = guestUid;
  else if (guestFalseStart) winnerUid = hostUid;
  else if (hostMs !== null && guestMs !== null) winnerUid = hostMs === guestMs ? null : hostMs < guestMs ? hostUid : guestUid;
  else if (hostMs !== null) winnerUid = hostUid;
  else if (guestMs !== null) winnerUid = guestUid;
  return {
    readyUids,
    goTime,
    hostMs,
    guestMs,
    hostFalseStart,
    guestFalseStart,
    winnerUid,
    isTie,
    phase: taps.length ? 'finished' : goMove ? 'go' : readyUids.length ? 'waiting' : 'idle',
  };
}

export function dilemmaState(moves, matchId, roomCode, localUid, language = getWebLanguage()) {
  const roundMoves = currentRound(moves, 'dilemma', matchId);
  const roundAdvances = roundMoves.filter(move => move.type === 'next').length;
  const lastAdvance = roundMoves.findLastIndex(move => move.type === 'next');
  const currentMoves = roundMoves.slice(lastAdvance + 1);
  const picks = currentMoves.filter(move => move.type === 'pick');
  const mine = picks.findLast(move => move.playerUid === localUid)?.payload?.choice ?? null;
  const theirs = picks.findLast(move => move.playerUid !== localUid)?.payload?.choice ?? null;
  const seed = Math.abs(kotlinStringHash(roomCode || ''));
  const dilemmaIndex = (seed + roundAdvances) % DILEMMAS.length;
  const dilemma = DILEMMAS[dilemmaIndex];
  const localized = DILEMMA_TRANSLATIONS[language]?.[dilemmaIndex];
  return { round: roundAdvances, optionA: localized?.[0] ?? dilemma[0], optionB: localized?.[1] ?? dilemma[1], mine, theirs, complete: mine !== null && theirs !== null, match: mine !== null && theirs !== null && mine === theirs };
}

export function bombPartyState(moves, matchId, roomCode, hostUid, guestUid, localUid, now = Date.now(), roomStartedAt = now) {
  const scoped = moves.filter(move => move.game === 'bomb_party' && move.matchId === matchId);
  const resetIndex = scoped.findLastIndex(move => move.type === 'reset');
  const roundMoves = scoped.slice(resetIndex + 1);
  const passMoves = roundMoves.filter(move => move.type === 'pass');
  const explosion = roundMoves.find(move => move.type === 'explode') || null;
  const passes = passMoves.length;
  const currentUid = passes % 2 === 0 ? hostUid : guestUid;
  const seed = Math.abs(kotlinStringHash(roomCode || ''));
  const wireIndex = (seed + passes * 3 + 1) % 4;
  const wire = ['RED', 'BLUE', 'YELLOW', 'GREEN'][wireIndex];
  const durationMs = Math.max(4500, 16000 - Math.min(passes * 800, 9500));
  const lastPassTime = passMoves.at(-1)?.createdAt?.toMillis?.() || passMoves.at(-1)?.createdAt || 0;
  const resetTime = scoped[resetIndex]?.createdAt?.toMillis?.() || scoped[resetIndex]?.createdAt || 0;
  const startedAt = Number(lastPassTime) || Number(resetTime) || roomStartedAt;
  const remainingMs = Math.max(0, durationMs - Math.max(0, now - startedAt));
  const explodedUid = explosion?.payload?.exploderUid || explosion?.playerUid || null;
  const winnerUid = explodedUid ? explodedUid === hostUid ? guestUid : hostUid : null;
  return { passMoves, passes, currentUid, isMyTurn: currentUid === localUid, wire, durationMs, remainingMs, explosion, explodedUid, winnerUid, roundToken: scoped[resetIndex]?.id || 'initial' };
}

export function cyberTapState(moves, matchId, hostUid, guestUid) {
  const picks = currentRound(moves, 'cyber_tap', matchId).filter(move => move.type === 'pick');
  const hostTaps = Number(picks.findLast(move => move.playerUid === hostUid)?.payload?.value);
  const guestTaps = Number(picks.findLast(move => move.playerUid === guestUid)?.payload?.value);
  const mine = Number.isFinite(hostTaps) ? hostTaps : null;
  const theirs = Number.isFinite(guestTaps) ? guestTaps : null;
  const winnerUid = mine !== null && theirs !== null ? mine === theirs ? null : mine > theirs ? hostUid : guestUid : null;
  return { picks, hostTaps: mine, guestTaps: theirs, winnerUid, complete: mine !== null && theirs !== null, draw: mine !== null && theirs !== null && mine === theirs };
}
