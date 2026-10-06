import test from 'node:test';
import assert from 'node:assert/strict';
import { chooserState, connectFourState, rockPaperState, ticTacToeState } from '../firebase-public/game-rules.js';

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
