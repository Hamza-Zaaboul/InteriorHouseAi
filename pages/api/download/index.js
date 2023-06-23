import firebase_app from '@/firebase/InitFirebase';
import axios from 'axios';
import { getAuth, signInWithCustomToken } from 'firebase/auth';
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const auth = getAuth(firebase_app);

const storage = getStorage(firebase_app);

export default async function handler(req, res) {
  const filePath = req.query.filePath;
  const uid = req.query.uid;

  try {
    await signInWithCustomToken(auth, uid); // Authentification avec l'UID spécifié

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
