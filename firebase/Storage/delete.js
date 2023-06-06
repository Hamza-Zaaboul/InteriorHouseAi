import { getStorage, ref, deleteObject } from "firebase/storage";
import firebase_app from "../InitFirebase";

const storage = getStorage(firebase_app);

export const deleteFilesByURLs = (fileURLs) => {

  return Promise.all(fileURLs.map((fileURL) => {
    return new Promise((resolve, reject) => {
      const pathFromURL = decodeURIComponent(fileURL.split(".com/o/")[1].split("?")[0]);
      const fileRef = ref(storage, pathFromURL);

      deleteObject(fileRef)
        .then(() => {
          console.log(`Fichier ${fileURL} supprimé avec succès.`);
          resolve();
        })
        .catch((error) => {
          console.log(`Erreur lors de la suppression du fichier ${fileURL} :`, error);
          reject(error);
        });
    });
  }));
};
