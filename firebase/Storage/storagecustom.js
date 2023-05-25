// firebaseStorage.js

import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import firebase_app from "../InitFirebase";

const storage = getStorage(firebase_app);

export const uploadFile = async (file, userId) => {
  return new Promise((resolve, reject) => {
    // Crée une référence de stockage avec un nom de fichier unique basé sur l'heure actuelle
    const storageRef = ref(storage, `users/${userId}/${file.name}`);
    
    // Commence le téléchargement
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Met à jour l'état de progression du téléchargement
    uploadTask.on("state_changed", (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(`Upload is ${progress}% done`);
    });

    // Renvoie l'URL de téléchargement une fois le téléchargement terminé
    uploadTask.then(() => {
      getDownloadURL(storageRef).then((url) => {
        resolve(url);
      });
    }).catch((error) => {
      reject(error);
    });
  });
};
