export { initializeApp } from 'firebase/app';
export { getAuth, signInAnonymously } from 'firebase/auth';
export {
  getFirestore,
  doc,
  collection,
  getDoc,
  getDocs,
  runTransaction,
  writeBatch,
  serverTimestamp,
  Timestamp,
  onSnapshot,
  setDoc,
  addDoc,
  query,
  orderBy,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
