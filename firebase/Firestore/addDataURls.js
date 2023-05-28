import firebase_app from "../InitFirebase";
import { getFirestore, doc, setDoc, collection, getDocs } from "firebase/firestore";

const db = getFirestore(firebase_app);

export default async function ajouterEnsembleUrls(collectionName, userId, urls) {
  let result = null;
  let error = null;

  try {
    const userRef = doc(db, collectionName, userId);

    // Récupérer les documents dans la collection "Historique" pour l'ID d'utilisateur
    const historiqueRef = collection(userRef, "Historique");
    const snapshot = await getDocs(historiqueRef);
    const subCollections = snapshot.docs.map((doc) => doc.id);

    // Générer le nom de la nouvelle sous-collection
    const sub_collection = "Historique" + (subCollections.length + 1);

    // Créer un nouveau document dans la sous-collection "Historique"
    const nouvelHistoriqueRef = doc(historiqueRef, sub_collection);

    const ensembleRef = await setDoc(
      nouvelHistoriqueRef,
      { urls: urls },
      { merge: true }
    );

    result = ensembleRef;
    console.log("L'ensemble d'URLs a été ajouté avec succès. ID du document :", result);
  } catch (e) {
    error = e;
    console.error("Erreur lors de l'ajout de l'ensemble d'URLs :", error);
  }

  return { result, error };
}
