import test from 'node:test';
import assert from 'node:assert/strict';
import { confirmReadyWithRetry } from '../firebase-public/lobby-sync.js';

test('concurrent ready conflict retries from latest state and starts once both are ready', async () => {
  let room = { status: 'preparing', matchId: 'match-1', playerCount: 2, readyUids: [] };
  let calls = 0;
  const waits = [];
  const runTransaction = async (_db, body) => {
    calls++;
    if (calls === 1) {
      // Simulate the other player winning the write race before this client retries.
      room = { ...room, readyUids: ['host'] };
      throw Object.assign(new Error('stale write'), { code: 'permission-denied' });
    }
    return body({
      get: async () => ({ exists: () => true, data: () => room }),
      update: (_ref, updates) => { room = { ...room, ...updates }; },
    });
  };
  await confirmReadyWithRetry({
    db: {}, roomRef: {}, uid: 'guest', matchId: 'match-1', runTransaction,
    serverTimestamp: () => 'server-time', wait: async milliseconds => waits.push(milliseconds),
  });
  assert.equal(calls, 2);
  assert.deepEqual(waits, [200]);
  assert.equal(room.status, 'playing');
  assert.deepEqual(new Set(room.readyUids), new Set(['host', 'guest']));
});

test('already-ready retries are idempotent and non-transient failures are not retried', async () => {
  let calls = 0;
  const runTransaction = async (_db, body) => {
    calls++;
    return body({
      get: async () => ({ exists: () => true, data: () => ({ status: 'preparing', matchId: 'm', playerCount: 2, readyUids: ['guest'] }) }),
      update: () => assert.fail('idempotent confirmation should not write again'),
    });
  };
  await confirmReadyWithRetry({ db: {}, roomRef: {}, uid: 'guest', matchId: 'm', runTransaction, serverTimestamp: () => 0 });
  assert.equal(calls, 1);

  calls = 0;
  await assert.rejects(() => confirmReadyWithRetry({
    db: {}, roomRef: {}, uid: 'guest', matchId: 'm',
    runTransaction: async () => { calls++; throw Object.assign(new Error('not authorized'), { code: 'unauthenticated' }); },
    serverTimestamp: () => 0,
  }), /not authorized/);
  assert.equal(calls, 1);
});
