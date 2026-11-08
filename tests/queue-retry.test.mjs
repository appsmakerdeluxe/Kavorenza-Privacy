import test from 'node:test';
import assert from 'node:assert/strict';
import { MAX_QUEUE_RECONNECT_ATTEMPTS, queueRetryDelay } from '../firebase-public/queue-retry.js';

test('queue reconnect retries exponentially, caps delay, then requires explicit retry or cancel', () => {
  assert.equal(MAX_QUEUE_RECONNECT_ATTEMPTS, 5);
  assert.deepEqual(Array.from({ length: 5 }, (_, attempt) => queueRetryDelay(attempt)), [1_500, 3_000, 6_000, 12_000, 15_000]);
  assert.equal(queueRetryDelay(5), null);
  assert.equal(queueRetryDelay(0, 20_000, 15_000), 15_000);
  assert.throws(() => queueRetryDelay(-1), RangeError);
});
