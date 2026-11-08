const ROOM_CHILD_COLLECTIONS = ['players', 'moves', 'events', 'votes', 'nicknameClaims'];
const BATCH_LIMIT = 400;
export const CLOSED_ROOM_RETENTION_MS = 3 * 60 * 1000;

/** Best-effort client cleanup for a room explicitly closed by its final player. */
export async function purgeClosedRoom({ db, roomRef, roomCode, collection, getDocs, writeBatch, doc, deleteDoc }) {
  for (const name of ROOM_CHILD_COLLECTIONS) {
    const snapshot = await getDocs(collection(roomRef, name));
    for (let offset = 0; offset < snapshot.docs.length; offset += BATCH_LIMIT) {
      const batch = writeBatch(db);
      snapshot.docs.slice(offset, offset + BATCH_LIMIT).forEach(item => batch.delete(item.ref));
      await batch.commit();
    }
  }
  if (roomCode) await deleteDoc(doc(db, 'roomCodes', roomCode));
  await deleteDoc(roomRef);
}
