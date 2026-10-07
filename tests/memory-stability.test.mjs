import test from 'node:test';
import assert from 'node:assert/strict';
import { emojiMemoryState } from '../firebase-public/game-rules.js';

function random(seed) {
  let state = seed >>> 0;
  return () => {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    return state;
  };
}

test('memory reducer survives thousands of mixed actions with identical player views', () => {
  let actionCount = 0;
  for (let seed = 1; seed <= 250; seed++) {
    const next = random(seed);
    const moves = [];
    for (let turn = 0; turn < 40; turn++) {
      const host = emojiMemoryState(moves, `match-${seed}`, `ROOM${seed}`, 'host', 'guest', 'host');
      const actor = next() % 4 === 0 ? (host.nextPlayerUid === 'host' ? 'guest' : 'host') : host.nextPlayerUid;
      const value = next() % 5 === 0
        ? `TIMEOUT:${host.nextPlayerUid}`
        : `pair:${next() % 12},${next() % 12}`;
      moves.push({ id: `${seed}-${turn}`, game: 'emoji_memory', matchId: `match-${seed}`, playerUid: actor, type: 'pick', payload: { value } });
      actionCount++;
      const afterHost = emojiMemoryState(moves, `match-${seed}`, `ROOM${seed}`, 'host', 'guest', 'host');
      const afterGuest = emojiMemoryState(moves, `match-${seed}`, `ROOM${seed}`, 'host', 'guest', 'guest');
      assert.equal(afterHost.nextPlayerUid, afterGuest.nextPlayerUid);
      assert.deepEqual(afterHost.matched, afterGuest.matched);
      assert.deepEqual(afterHost.visible, afterGuest.visible);
      assert.equal(afterHost.ownPairs, afterGuest.otherPairs);
      assert.equal(afterHost.otherPairs, afterGuest.ownPairs);
      assert.equal(afterHost.complete, afterGuest.complete);
      assert.equal(new Set(afterHost.matched).size, afterHost.matched.length);
      assert.equal(afterHost.matched.length % 2, 0);
      assert.ok(afterHost.turns <= 24);
      assert.ok(afterHost.ownPairs + afterHost.otherPairs <= 6);
      if (afterHost.complete) break;
    }
  }
  assert.ok(actionCount >= 2500);
});
