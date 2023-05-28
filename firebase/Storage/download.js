import { getStorage, ref, getDownloadURL } from "firebase/storage";
import firebaseApp from "../InitFirebase";
import axios from "axios";

const storage = getStorage(firebaseApp);

export default async function downloadFromStorage(filePath) {
  try {
    const storageRef = ref(storage, filePath);
    const downloadURL = await getDownloadURL(storageRef);

    // Utilisez l'URL de téléchargement pour effectuer des opérations sur l'image (par exemple, l'afficher ou la télécharger)
    // Par exemple, en utilisant axios pour télécharger l'image
    const response = await axios.get(downloadURL, {
      responseType: "blob", // Spécifiez le type de réponse comme 'blob' pour télécharger le contenu de l'image
    });

    // Faites quelque chose avec la réponse, par exemple, enregistrez l'image sur le disque ou affichez-la dans votre application
    console.log(response.data); // Le contenu de l'image au format blob
  } catch (error) {
    console.log(error);
  }
}
