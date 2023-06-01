import firebase_app from "../InitFirebase";
import { getFirestore, deleteDoc, doc, collection } from "firebase/firestore";

const db = getFirestore(firebase_app)

export async function deleteDocument(collectionName, userId, subCollectionName, DocID) {
    console.log(`Tentative de suppression du document ${DocID} dans la sous-collection ${subCollectionName} de l'utilisateur ${userId} dans la collection ${collectionName}.`);

    const userRef = doc(db, collectionName, userId);
    const subCollectionRef = collection(userRef, subCollectionName);
    const docRefToDelete = doc(subCollectionRef, DocID)

    try {
        await deleteDoc(docRefToDelete);
        console.log("Le document a été supprimé avec succès.");
    } catch (error) {
        console.error("Une erreur s'est produite lors de la suppression du document :", error);
    }
}
