import firebase_app from "../InitFirebase";
import { getFirestore, doc, collection, getDocs } from "firebase/firestore";

const db = getFirestore(firebase_app);

export default async function getAllDocuments(collectionName, userId, subCollectionName) {
  let result = null;
  let error = null;

  try {
    const userRef = doc(db, collectionName, userId);
    const subCollectionRef = collection(userRef, subCollectionName);
    const querySnapshot = await getDocs(subCollectionRef);

    result = querySnapshot.docs.map((doc) => doc.data());
  } catch (e) {
    error = e;
  }

  return { result, error };
}

//Permet de recupere la data des souscolections