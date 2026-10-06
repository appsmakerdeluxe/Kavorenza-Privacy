const RETRYABLE_CODES = new Set(['permission-denied', 'aborted', 'unavailable']);

/** Retries only transient conflicts after reading the newest lobby snapshot. */
export async function confirmReadyWithRetry({
  db, roomRef, uid, matchId, runTransaction, serverTimestamp,
  wait = milliseconds => new Promise(resolve => setTimeout(resolve, milliseconds)),
}) {
  for (let attempt = 0; ; attempt++) {
    try {
      await runTransaction(db, async transaction => {
        const snapshot = await transaction.get(roomRef);
        if (!snapshot.exists()) throw new Error('Raum wurde geschlossen.');
        const room = snapshot.data();
        if (room.matchId !== matchId) throw new Error('Runde hat sich geändert. Bitte erneut wählen.');
        const ready = new Set(room.readyUids || []);
        if (room.status === 'playing' && ready.has(uid)) return;
        if (room.status !== 'preparing' || room.playerCount !== 2) throw new Error('Runde benötigt zwei Spieler und muss noch vorbereitet werden.');
        if (ready.has(uid)) return;
        ready.add(uid);
        const updates = { readyUids: [...ready], lastActivityAt: serverTimestamp() };
        if (ready.size === 2) updates.status = 'playing';
        transaction.update(roomRef, updates);
      });
      return;
    } catch (error) {
      if (!RETRYABLE_CODES.has(error?.code) || attempt >= 2) throw error;
      await wait(200 * (attempt + 1));
    }
  }
}
