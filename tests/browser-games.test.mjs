import test from 'node:test';
import assert from 'node:assert/strict';
import { bombPartyState, chooserState, connectFourState, cyberTapState, dilemmaState, reflexState, rockPaperState, ticTacToeState } from '../firebase-public/game-rules.js';

const matchId = 'match-1';
const move = (game, playerUid, type, payload = {}) => ({ game, matchId, playerUid, type, payload });

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
