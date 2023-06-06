import { getStorage, ref, getDownloadURL } from "firebase/storage";
import firebaseApp from "../InitFirebase";


const storage = getStorage(firebaseApp);

export default async function downloadFromStorage(filePath) {

    try {
      const storageRef = ref(storage, filePath);
      const url = await getDownloadURL(storageRef);
  
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "image.jpg");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Erreur lors du téléchargement de l'image :", error);
    }
  };
  