import { getStorage, ref, getDownloadURL } from "firebase/storage";
import firebaseApp from "../InitFirebase";
import JSZip from "jszip";
import { saveAs } from "file-saver";

const storage = getStorage(firebaseApp);

export const downloadFromStorage = async (filePaths) => {
  const zip = new JSZip();

  const downloadFile = (filePath) => {
    return new Promise((resolve, reject) => {
      const storageRef = ref(storage, filePath);

      getDownloadURL(storageRef)
        .then((url) => {
          fetch(url)
            .then((response) => response.blob())
            .then((blob) => {
              resolve({ filePath, blob });
            })
            .catch((error) => {
              reject(error);
            });
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const downloadPromises = filePaths.map((filePath) => downloadFile(filePath));

  try {
    const results = await Promise.all(downloadPromises);

    results.forEach(({ filePath, blob }) => {
      zip.file(filePath, blob);
    });

    const zipBlob = await zip.generateAsync({ type: "blob" });
    saveAs(zipBlob, "download.zip");
  } catch (error) {
    console.error("Error occurred during download:", error);
  }
};
