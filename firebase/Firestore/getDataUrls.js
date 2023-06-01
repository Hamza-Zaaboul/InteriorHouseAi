import { getFirestore, doc, collection, getDocs } from "firebase/firestore";
import firebaseApp from "../InitFirebase";

const db = getFirestore(firebaseApp);

export default async function getAllDocuments(collectionName, userId, subCollectionName) {
  let result = null;
  let error = null;

  try {
    const userRef = doc(db, collectionName, userId);
    const subCollectionRef = collection(userRef, subCollectionName);
    const querySnapshot = await getDocs(subCollectionRef);

    result = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (e) {
    error = e;
  }

  return { result, error };
}
