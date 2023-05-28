import { getStorage, ref, uploadBytesResumable, getDownloadURL, listAll } from "firebase/storage";
import firebase_app from "../InitFirebase";

const storage = getStorage(firebase_app);

export const uploadFile = async (file, userId) => {
  return new Promise((resolve, reject) => {
    // Obtenir la référence du dossier "Historique_beforeandafter" pour l'utilisateur
    const historyRef = ref(storage, `users/${userId}/Historique`);

    // Obtenir la liste des sous-dossiers existants
    listAll(historyRef).then((listResult) => {
      const lastFolder = listResult.prefixes.length; // Récupérer le nombre de sous-dossiers existants

      // Incrémenter le numéro du dernier sous-dossier et créer un nouveau sous-dossier
      const newFolderNumber = lastFolder + 1;
      const newFolderName = `${newFolderNumber}`;
      const newFolderRef = ref(historyRef, newFolderName);
      const newFileRef = ref(newFolderRef, file.name);

      // Commencer le téléchargement
      const uploadTask = uploadBytesResumable(newFileRef, file);

      // Mettre à jour l'état de progression du téléchargement
      uploadTask.on("state_changed", (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      });

      // Renvoyer l'URL de téléchargement une fois le téléchargement terminé
      uploadTask.then(() => {
        getDownloadURL(newFileRef).then((url) => {
          resolve({ url: url, folderRef: newFolderRef, name : file.name });
        });

      }).catch((error) => {
        reject(error);
      });
    }).catch((error) => {
      reject(error);
    });
  });
};

