import test from 'node:test';
import assert from 'node:assert/strict';
import { CLOSED_ROOM_RETENTION_MS, purgeClosedRoom } from '../firebase-public/room-cleanup.js';

test('closed-room retention is short but leaves a retry window', () => {
  assert.equal(CLOSED_ROOM_RETENTION_MS, 3 * 60 * 1000);
});

test('cleanup chunks large subcollections and deletes lookup/root documents last', async () => {
  const deleted = [];
  const committedSizes = [];
  const db = {};
  const roomRef = { path: 'rooms/room-1' };
  const collection = (ref, name) => ({ ref, name });
  const getDocs = async ({ name }) => ({
    docs: Array.from({ length: name === 'moves' ? 801 : 2 }, (_, index) => ({ ref: `${name}/${index}` })),
  });
  const writeBatch = () => {
    const pending = [];
    return {
      delete: ref => pending.push(ref),
      commit: async () => { committedSizes.push(pending.length); deleted.push(...pending); },
    };
  };
  const doc = (_db, collectionName, id) => ({ path: `${collectionName}/${id}` });
  const deleteDoc = async ref => deleted.push(ref.path);

  await purgeClosedRoom({ db, roomRef, roomCode: 'ABC123', collection, getDocs, writeBatch, doc, deleteDoc });
  assert.deepEqual(committedSizes, [2, 400, 400, 1, 2, 2, 2]);
  assert.equal(deleted.at(-2), 'roomCodes/ABC123');
  assert.equal(deleted.at(-1), 'rooms/room-1');
  assert.equal(deleted.length, 811);
});

test('failed child cleanup does not delete the room directory or root', async () => {
  const deleted = [];
  const roomRef = { path: 'rooms/room-2' };
  await assert.rejects(() => purgeClosedRoom({
    db: {}, roomRef, roomCode: 'DEF456',
    collection: (_ref, name) => ({ name }),
    getDocs: async () => ({ docs: [{ ref: 'moves/1' }] }),
    writeBatch: () => ({ delete() {}, commit: async () => { throw new Error('simulated transient network loss'); } }),
    doc: (_db, name, id) => ({ path: `${name}/${id}` }),
    deleteDoc: async ref => deleted.push(ref.path),
  }), /simulated transient network loss/);
  assert.deepEqual(deleted, []);
});
