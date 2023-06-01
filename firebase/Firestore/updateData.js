import { getFirestore, doc, updateDoc } from "firebase/firestore";
import firebase_app from "../InitFirebase";

const db = getFirestore(firebase_app);

export async function updateDocument(collection, id, field, value) {
  const docRef = doc(db, collection, id);

  try {
    await updateDoc(docRef, {
      [field]: value
    });
  } catch (e) {
    console.error("Error updating document: ", e);
  }
}
