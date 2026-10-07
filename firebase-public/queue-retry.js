export const MAX_QUEUE_RECONNECT_ATTEMPTS = 5;
export const QUEUE_RETRY_BASE_MS = 1_500;
export const QUEUE_RETRY_MAX_MS = 15_000;

/** Return the bounded delay for a zero-based automatic retry, or null when user action is required. */
export function queueRetryDelay(attempt, baseMs = QUEUE_RETRY_BASE_MS, maxMs = QUEUE_RETRY_MAX_MS) {
  if (!Number.isInteger(attempt) || attempt < 0) throw new RangeError('attempt must be a non-negative integer');
  if (attempt >= MAX_QUEUE_RECONNECT_ATTEMPTS) return null;
  return Math.min(baseMs * (2 ** attempt), maxMs);
}
