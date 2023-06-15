import firebase_app from "../InitFirebase";
import { getFirestore, doc, setDoc, collection, getDocs } from "firebase/firestore";

const db = getFirestore(firebase_app);

export default async function archivagePayment(collectionName, userId, data) {
  let result = null;
  let error = null;

  try {
    const userRef = doc(db, collectionName, userId);

    // Récupérer les documents dans la collection "Historique" pour l'ID d'utilisateur
    const historiqueRef = collection(userRef, "Achats");
    const snapshot = await getDocs(historiqueRef);
    const subCollections = snapshot.docs.map((doc) => doc.id);

    // Générer le nom de la nouvelle sous-collection
    const sub_collection = "Achat" + (subCollections.length + 1);

    // Créer un nouveau document dans la sous-collection "Historique"
    const nouvelHistoriqueRef = doc(historiqueRef, sub_collection);

    const ensembleRef = await setDoc(
      nouvelHistoriqueRef,
      { data: data },
      { merge: true }
    );

    result = ensembleRef;
    console.log("L'ensemble des detailles de payment a été ajouté avec succès. ID du document :", sub_collection);
  } catch (e) {
    error = e;
    console.error("Erreur lors de l'ajout de l'ensemble des details de payments:", error);
  }

  return { result, error };
}