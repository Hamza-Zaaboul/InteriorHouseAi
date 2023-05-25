import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import firebase_app from '../InitFirebase';

const auth = getAuth(firebase_app);

async function sendResetEmail(email) {
  try {
    await sendPasswordResetEmail(auth, email);
    console.log("Password reset email sent successfully!");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: error.status };
  }
}

export default sendResetEmail;
