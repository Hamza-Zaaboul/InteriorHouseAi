// Dans un fichier server.js ou dans votre API Next.js
import firebase_app from '@/firebase/InitFirebase';
import axios from 'axios';
import { getStorage, ref, getDownloadURL } from "firebase/storage";


const storage = getStorage(firebase_app);

export default async function handler(req, res) {
  const filePath = req.query.filePath;

  try {
    const storageRef = ref(storage, filePath);
    const url = await getDownloadURL(storageRef) + "?alt=media";

    const response = await axios.get(url, {
      responseType: "arraybuffer",
    });

    res.setHeader('Content-Disposition', `attachment; filename=${filePath}`);
    res.send(response.data);
  } catch (error) {
    res.status(500).send({ error: 'Error downloading file' });
  }
};
