
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import firebaseApp from "../InitFirebase";

const storage = getStorage(firebaseApp);

export const uploadAfter = async (file, reference, name) => {
  return new Promise((resolve, reject) => {
    fetch(file)
      .then(response => response.blob())
      .then(blob => {
        const storageRef = ref(storage, `${reference}/${name + "_after"}`);
        const uploadTask = uploadBytesResumable(storageRef, blob);

        uploadTask.on("state_changed", (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        }, (error) => {
          reject(error);
        }, () => {
          getDownloadURL(storageRef).then((url) => {
            resolve(url);
          }).catch((error) => {
            reject(error);
          });
        });
      })
      .catch((error) => {
        reject(error);
      });
  });
};


