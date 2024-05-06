import { db } from './firebaseConfig';
import { collection, query, where, getDocs, writeBatch } from 'firebase/firestore';

export const updateAllUserComments = async (userId, newUsername) => {
    const commentsRef = collection(db, "comments");
    const q = query(commentsRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    const batch = writeBatch(db);

    querySnapshot.forEach((doc) => {
        batch.update(doc.ref, { username: newUsername });
    });

    await batch.commit();
};
