import firebase_app from '../InitFirebase';
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

const auth = getAuth(firebase_app);


export default async function signUp(email, password) {
    let result = null,
        error = null,
        uid = null;
    try {
        result = await createUserWithEmailAndPassword(auth, email, password);
        uid = result.user.uid;
    } catch (e) {
        error = e;
    }

    return { result, error, uid };
}