import firebase_app from '@/firebase/InitFirebase';
import { getStorage, ref, deleteObject } from "firebase/storage";


const storage = getStorage(firebase_app);

export default async function handler(req, res) {
  const filePaths = req.query.filePath; // La liste de liens

  try {
    const deletePromises = filePaths.map(filePath => {
      const storageRef = ref(storage, filePath);
      return deleteObject(storageRef);
    });

    await Promise.all(deletePromises);

    res.status(200).send({ message: 'Documents supprimés avec succès.' });
  } catch (error) {
    res.status(500).send({ error: 'Une erreur s\'est produite lors de la suppression des documents.' });
  }
}
