import firebase_app from '../InitFirebase';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, getAuth } from "firebase/auth";

const auth = getAuth(firebase_app);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export async function signIn(email, password) {
    let result = null,
        error = null,
        uid = null;
    try {
        result = await signInWithEmailAndPassword(auth, email, password);
        uid = result.user.uid;

    } catch (e) {
        error = e;
    }

    return { result, error, uid };
}

export async function GoogleLogin() {
    try {
        const googleResult = await signInWithPopup(auth, provider);
        const user = googleResult.user;

        return { user };
    } catch (error) {
        return { error };
    }
}