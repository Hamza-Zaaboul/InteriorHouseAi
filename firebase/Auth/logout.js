import {
    getAuth,
    signOut
} from 'firebase/auth';
import firebase_app from '../InitFirebase';


const auth = getAuth(firebase_app);

export const signOutUser = () => {
    signOut(auth).then(() => {
        // Déconnexion réussie
    }).catch((error) => {
        console.log(error);
    });
};