import test from 'node:test';
import assert from 'node:assert/strict';
import { arcadeRunState, bombPartyState, chooserState, colorRushRounds, connectFourState, cyberTapState, dilemmaState, emojiMemoryBoard, emojiMemoryState, MEMORY_TURN_TIMEOUT_SECONDS, numberTargetPuzzle, reflexState, rockPaperState, seededIndices, seededShuffle, ticTacToeState, wordSprintRounds } from '../firebase-public/game-rules.js';
import { quizDuelState, quizQuestions } from '../firebase-public/quiz-data.js';

const matchId = 'match-1';
const move = (game, playerUid, type, payload = {}) => ({ game, matchId, playerUid, type, payload });

test('room-seeded round generation matches Android golden vectors', () => {
  assert.deepEqual(seededShuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 2048), [5, 6, 2, 7, 4, 1, 3, 8, 9, 0]);
  assert.deepEqual(seededIndices(2048, 5, 5), [0, 0, 0, 2, 1]);
  const puzzle = numberTargetPuzzle(4123, 2);
  assert.equal(puzzle.target, 21);
  assert.equal(puzzle.bestExpression, '10 + 11 = 21');
  assert.deepEqual(puzzle.options.map(option => option.expression), ['10 + 11 = 21', '7 × 9 = 63', '6 + 5 = 11', '8 × 8 = 64']);
  assert.deepEqual(colorRushRounds(true, 2048).map(round => round[1]), ['CYAN', 'CYAN', 'CYAN', 'MINT', 'PINK']);
  assert.deepEqual(wordSprintRounds(true, 2048).map(round => round[0]), ['BLITZ', 'STERN', 'FEUER', 'SIEG', 'NACHT']);
  assert.deepEqual(emojiMemoryBoard(2048), ['🌟', '💎', '🔥', '👾', '👾', '🚀', '💎', '🌟', '🔥', '⚡', '🚀', '⚡']);
});

test('Color Rush and Word Sprint preserve seeded answer identity across all five languages', () => {
  const baseColors = colorRushRounds(true, 2048, 'de');
  const baseWords = wordSprintRounds(true, 2048, 'de');
  for (const language of ['en', 'es', 'fr', 'it']) {
    const colors = colorRushRounds(true, 2048, language);
    const words = wordSprintRounds(true, 2048, language);
    assert.deepEqual(colors.map(round => round[1]), baseColors.map(round => round[1]));
    assert.deepEqual(words.map(([prompt, options]) => options.indexOf(prompt)), baseWords.map(([prompt, options]) => options.indexOf(prompt)));
    for (const [prompt, options] of words) assert.ok(options.includes(prompt), `${language}: ${prompt} is an answer option`);
    assert.notDeepEqual(colors.map(round => round[0]), baseColors.map(round => round[0]));
    assert.notDeepEqual(words.map(round => round[0]), baseWords.map(round => round[0]));
  }
});

test('Speed Quiz uses Android question order, hides picks, scores answers and resets', () => {
  const questions = quizQuestions(2048);
  assert.deepEqual(questions.map(question => question.prompt), [
    'Wie viele Millimeter sind 1,5 Meter?', 'Welche Währung hat Japan?', 'Aus welchem Land stammt Pizza ursprünglich?',
    'Welche Einheit misst elektrische Spannung?', 'Welche Farbe hat eine reife Banane?',
  ]);
  let log = [move('code_breaker', 'host', 'answer', { answerIndex: questions[0].correctIndex })];
  assert.equal(quizDuelState(log, matchId, 'host', 2048).answeredCurrent, true);
  assert.equal(quizDuelState(log, matchId, 'guest', 2048).answeredCurrent, false);
  for (let index = 0; index < questions.length; index++) {
    if (index > 0) log.push(move('code_breaker', 'host', 'answer', { answerIndex: questions[index].correctIndex }));
    log.push(move('code_breaker', 'guest', 'answer', { answerIndex: questions[index].correctIndex }));
  }
  const done = quizDuelState(log, matchId, 'host', 2048);
  assert.equal(done.complete, true);
  assert.equal(done.score, 5);
  assert.equal(done.otherScore, 5);
  assert.equal(quizDuelState([...log, move('code_breaker', 'host', 'reset')], matchId, 'host', 2048).questionIndex, 0);
});

test('Tic Tac Toe reads Android-compatible moves, turn order, reset and win line', () => {
  const log = [
    move('tic_tac_toe', 'host', 'move', { cell: 0 }),
    move('tic_tac_toe', 'guest', 'move', { cell: 3 }),
    move('tic_tac_toe', 'host', 'move', { cell: 1 }),
    move('tic_tac_toe', 'guest', 'move', { cell: 4 }),
    move('tic_tac_toe', 'host', 'move', { cell: 2 }),
  ];
  const state = ticTacToeState(log, matchId, 'host', 'guest');
  assert.equal(state.winner, 'X');
  assert.deepEqual(state.winningLine, [0, 1, 2]);
  assert.equal(state.currentPlayerUid, 'guest');
  assert.equal(ticTacToeState([...log, move('tic_tac_toe', 'host', 'reset')], matchId, 'host', 'guest').winner, null);
});

test('Connect Four resolves gravity, vertical wins and skipped timeout turns', () => {
  const log = [
    move('connect_four', 'host', 'move', { column: 0 }),
    move('connect_four', 'guest', 'move', { column: 1 }),
    move('connect_four', 'host', 'move', { column: 0 }),
    move('connect_four', 'guest', 'timeout'),
    move('connect_four', 'host', 'move', { column: 0 }),
    move('connect_four', 'guest', 'move', { column: 1 }),
    move('connect_four', 'host', 'move', { column: 0 }),
  ];
  const state = connectFourState(log, matchId, 'host', 'guest');
  assert.equal(state.winner, 1);
  assert.deepEqual(state.winningCells, [14, 21, 28, 35]);
  assert.equal(state.board[35], 1);
  assert.equal(state.currentPlayerUid, 'guest');
});

test('Rock Paper Glow matches Android outcomes, including timeouts', () => {
  const choices = (host, guest) => [
    move('rock_paper', 'host', 'pick', { value: host }),
    move('rock_paper', 'guest', 'pick', { value: guest }),
  ];
  assert.equal(rockPaperState(choices('ROCK', 'GLOW'), matchId, 'host').winner, 1);
  assert.equal(rockPaperState(choices('PAPER', 'ROCK'), matchId, 'host').winner, 1);
  assert.equal(rockPaperState(choices('GLOW', 'PAPER'), matchId, 'host').winner, 1);
  assert.equal(rockPaperState(choices('PAPER', 'PAPER'), matchId, 'host').winner, 0);
  assert.equal(rockPaperState(choices('TIMEOUT', 'ROCK'), matchId, 'host').winner, 2);
});

test('Decision Blitz presence follows latest hold/release and shared winner UID', () => {
  const log = [
    move('chooser', 'host', 'hold'),
    move('chooser', 'guest', 'hold'),
  ];
  assert.equal(chooserState(log, matchId).bothHolding, true);
  assert.equal(chooserState([...log, move('chooser', 'guest', 'release')], matchId).bothHolding, false);
  assert.equal(chooserState([...log, move('chooser', 'host', 'decide', { winnerUid: 'guest' })], matchId).winnerUid, 'guest');
});

test('Reflex Duel uses Android ready/go/tap/reset moves and resolves reaction times', () => {
  const log = [
    move('reflex', 'host', 'ready'),
    move('reflex', 'host', 'go', { time: 1_000 }),
    move('reflex', 'guest', 'tap', { time: 1_145 }),
  ];
  const state = reflexState(log, matchId, 'host', 'guest');
  assert.equal(state.phase, 'finished');
  assert.equal(state.winnerUid, 'guest');
  assert.equal(state.guestMs, 145);
  assert.equal(reflexState([...log, move('reflex', 'host', 'reset')], matchId, 'host', 'guest').phase, 'idle');
  const falseStart = reflexState([
    move('reflex', 'host', 'ready'),
    move('reflex', 'host', 'tap', { falseStart: true }),
  ], matchId, 'host', 'guest');
  assert.equal(falseStart.winnerUid, 'guest');
  assert.equal(falseStart.hostFalseStart, true);
  const bothFalse = reflexState([
    move('reflex', 'host', 'ready'),
    move('reflex', 'host', 'tap', { falseStart: true }),
    move('reflex', 'guest', 'tap', { falseStart: true }),
  ], matchId, 'host', 'guest');
  assert.equal(bothFalse.isTie, true);
  assert.equal(bothFalse.winnerUid, null);
  const bothTap = reflexState([
    move('reflex', 'host', 'go', { time: 10_000 }),
    move('reflex', 'guest', 'tap', { time: 10_240 }),
    move('reflex', 'host', 'tap', { time: 10_180 }),
  ], matchId, 'host', 'guest');
  assert.equal(bothTap.winnerUid, 'host');
  assert.equal(bothTap.hostMs, 180);
  assert.equal(bothTap.guestMs, 240);
});

test('Would You Rather hides choices until both players answer and advances together', () => {
  const roundOne = [
    move('dilemma', 'host', 'pick', { choice: 'A', round: 0 }),
    move('dilemma', 'guest', 'pick', { choice: 'A', round: 0 }),
  ];
  const hostView = dilemmaState(roundOne, matchId, 'ABC123', 'host');
  assert.equal(hostView.complete, true);
  assert.equal(hostView.match, true);
  assert.equal(hostView.mine, 'A');
  assert.equal(hostView.theirs, 'A');
  const roundTwoMoves = [...roundOne, move('dilemma', 'host', 'next', { round: 1 })];
  const next = dilemmaState(roundTwoMoves, matchId, 'ABC123', 'guest');
  assert.equal(next.round, 1);
  assert.equal(next.mine, null);
  assert.notDeepEqual([next.optionA, next.optionB], [hostView.optionA, hostView.optionB]);
});

test('all 36 Would You Rather rounds are localized without changing shared round or pick state', () => {
  const nextMoves = Array.from({ length: 35 }, (_, index) => move('dilemma', 'host', 'next', { round: index + 1 }));
  for (const language of ['en', 'es', 'fr', 'it']) {
    for (let round = 0; round < 36; round++) {
      const moves = nextMoves.slice(0, round);
      const german = dilemmaState(moves, matchId, '', 'host', 'de');
      const localized = dilemmaState(moves, matchId, '', 'host', language);
      assert.equal(localized.round, german.round);
      assert.ok(localized.optionA.length > 2 && localized.optionB.length > 2);
      assert.notDeepEqual([localized.optionA, localized.optionB], [german.optionA, german.optionB]);
      const picked = dilemmaState([...moves, move('dilemma', 'host', 'pick', { choice: 'A', round })], matchId, '', 'host', language);
      assert.equal(picked.mine, 'A');
      assert.equal(picked.theirs, null);
    }
  }
});

test('Bomb Party alternates turns, shortens fuse, resets and awards the non-exploding player', () => {
  const now = 20_000;
  const first = bombPartyState([], matchId, 'ABC123', 'host', 'guest', 'host', now, 10_000);
  assert.equal(first.isMyTurn, true);
  assert.equal(first.remainingMs, 6_000);
  const afterPass = bombPartyState([
    { ...move('bomb_party', 'host', 'pass'), createdAt: 15_000, id: 'pass-1' },
  ], matchId, 'ABC123', 'host', 'guest', 'guest', now, 10_000);
  assert.equal(afterPass.isMyTurn, true);
  assert.equal(afterPass.passes, 1);
  assert.equal(afterPass.durationMs, 15_200);
  const exploded = bombPartyState([
    move('bomb_party', 'host', 'explode', { exploderUid: 'guest' }),
  ], matchId, 'ABC123', 'host', 'guest', 'host', now, 10_000);
  assert.equal(exploded.winnerUid, 'host');
  const reset = bombPartyState([
    move('bomb_party', 'host', 'explode', { exploderUid: 'guest' }),
    move('bomb_party', 'host', 'reset'),
  ], matchId, 'ABC123', 'host', 'guest', 'host', now, 10_000);
  assert.equal(reset.explosion, null);
  assert.equal(reset.passes, 0);
});

test('Cyber Tap Rush scores both player totals, ties and resets', () => {
  const finished = [
    move('cyber_tap', 'host', 'pick', { value: '42' }),
    move('cyber_tap', 'guest', 'pick', { value: '37' }),
  ];
  assert.equal(cyberTapState(finished, matchId, 'host', 'guest').winnerUid, 'host');
  assert.equal(cyberTapState(finished.map(m => ({ ...m, payload: { value: '37' } })), matchId, 'host', 'guest').draw, true);
  assert.equal(cyberTapState([...finished, move('cyber_tap', 'host', 'reset')], matchId, 'host', 'guest').complete, false);
});

test('Arcade score tracks remain private per player and reset per match', () => {
  const moves = [
    ...Array.from({ length: 5 }, (_, index) => move('color_rush', 'host', 'pick', { value: `CYAN;${100 - index}` })),
    ...Array.from({ length: 4 }, (_, index) => move('color_rush', 'guest', 'pick', { value: `PINK;${index}` })),
  ];
  assert.deepEqual(arcadeRunState(moves, 'color_rush', matchId, 'host'), {
    own: moves.slice(0, 5), other: moves.slice(5), round: 5, ownScore: 490, otherScore: 6, complete: false,
  });
  assert.equal(arcadeRunState([...moves, move('color_rush', 'guest', 'pick', { value: 'MINT;1' })], 'color_rush', matchId, 'host').complete, true);
  assert.equal(arcadeRunState([...moves, move('color_rush', 'host', 'reset')], 'color_rush', matchId, 'host').round, 0);
});

test('Emoji Memory follows Android match-retain, mismatch-switch, timeout and completion rules', () => {
  assert.equal(MEMORY_TURN_TIMEOUT_SECONDS, 15);
  const pair = (uid, a, b) => move('emoji_memory', uid, 'pick', { value: `pair:${a},${b}` });
  const log = [pair('host', 3, 4), pair('host', 0, 2)];
  const host = emojiMemoryState(log, matchId, 'KAVO', 'host', 'guest', 'host');
  const guest = emojiMemoryState(log, matchId, 'KAVO', 'host', 'guest', 'guest');
  assert.equal(host.ownPairs, 1);
  assert.equal(host.otherPairs, 0);
  assert.equal(host.nextPlayerUid, 'guest');
  assert.equal(guest.nextPlayerUid, 'guest');
  const timedOut = emojiMemoryState([...log, move('emoji_memory', 'guest', 'pick', { value: 'TIMEOUT' })], matchId, 'KAVO', 'host', 'guest', 'guest');
  assert.equal(timedOut.nextPlayerUid, 'host');
  assert.equal(emojiMemoryState(Array.from({ length: 6 }, (_, index) => pair('host', ...[[0, 5], [1, 10], [2, 8], [3, 4], [6, 7], [9, 11]][index])), matchId, 'KAVO', 'host', 'guest', 'host').complete, true);
});

test('Emoji Memory shares every flipped card and keeps a mismatch visible until resolve', () => {
  const card = (id, uid, index, createdAt) => ({ ...move('emoji_memory', uid, 'pick', { value: `card:${index}` }), id, createdAt });
  const first = card('first', 'host', 0, 1_000);
  const one = emojiMemoryState([first], matchId, 'KAVO', 'host', 'guest', 'guest');
  assert.deepEqual(one.visible, [0]);
  assert.equal(one.nextPlayerUid, 'host');
  assert.equal(one.turnNumber, 0);
  const second = card('second', 'host', 1, 2_000);
  const revealed = emojiMemoryState([first, second], matchId, 'KAVO', 'host', 'guest', 'guest');
  assert.deepEqual(revealed.visible, [0, 1]);
  assert.equal(revealed.nextPlayerUid, 'host');
  assert.equal(revealed.turnNumber, 0);
  assert.equal(revealed.turnStartedAt, null);
  const resolved = emojiMemoryState([first, second, { ...move('emoji_memory', 'host', 'pick', { value: 'resolve' }), id: 'resolve', createdAt: 3_500 }], matchId, 'KAVO', 'host', 'guest', 'guest');
  assert.deepEqual(resolved.visible, []);
  assert.equal(resolved.nextPlayerUid, 'guest');
  assert.equal(resolved.turnNumber, 1);
  assert.equal(resolved.turnStartedAt, 3_500);
  const recovered = emojiMemoryState([first, second, { ...move('emoji_memory', 'guest', 'pick', { value: 'resolve' }), id: 'guest-resolve', createdAt: 3_500 }], matchId, 'KAVO', 'host', 'guest', 'guest');
  assert.equal(recovered.nextPlayerUid, 'guest');
  assert.deepEqual(recovered.visible, []);
});

test('Emoji Memory ignores forged out-of-turn, duplicate-card and already-matched picks', () => {
  const pair = (uid, value) => move('emoji_memory', uid, 'pick', { value });
  const moves = [
    pair('guest', 'pair:0,5'), // guest cannot move before the host
    pair('host', 'pair:0,0'), // one card cannot match itself
    pair('host', 'pair:0,1'), // mismatch passes to the guest
    pair('host', 'pair:0,5'), // stale host action is ignored
    pair('guest', 'TIMEOUT'), // bounded turn hands control back
    pair('host', 'pair:0,5'), // valid pair scores and retains the turn
    pair('host', 'pair:0,5'), // matched cards cannot score twice
  ];
  const state = emojiMemoryState(moves, matchId, 'KAVO', 'host', 'guest', 'host');
  assert.equal(state.ownPairs, 1);
  assert.equal(state.otherPairs, 0);
  assert.equal(state.nextPlayerUid, 'host');
  assert.deepEqual(state.matched, [0, 5]);
  assert.equal(state.turns, 2);
});

test('either connected player may expire the active turn and duplicate reports remain idempotent', () => {
  const timeout = uid => move('emoji_memory', uid, 'pick', { value: 'TIMEOUT:host' });
  const state = emojiMemoryState([timeout('guest'), timeout('host')], matchId, 'KAVO', 'host', 'guest', 'host');
  assert.equal(state.nextPlayerUid, 'guest');
});
