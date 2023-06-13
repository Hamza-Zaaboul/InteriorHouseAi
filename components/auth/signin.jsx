import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import signUp from "@/firebase/Auth/signup";
import addData from "@/firebase/Firestore/appData";
import { GoogleLogin } from "@/firebase/Auth/signin";
import getDocument from "@/firebase/Firestore/getData";
import toast, { Toaster } from "react-hot-toast";

export default function Sigin() {
  const [check, setCkeck] = useState(false);

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [username, setUsername] = useState("");

  const [namefull, setNamefull] = useState("");

  const [repeatPassword, setRepeatPassword] = useState("");

  const router = useRouter();

  const handleForm = async (event) => {
    event.preventDefault();

    if (password !== repeatPassword) {
      toast.error("Les mots de passe ne correspondent pas.");
      
      return;
    }


    const data = {
      email: email,
      pseudo: username,
      nom_prenom: namefull,
      piec: "5",
      blocked: false,
    };

    const {
      uid,
      result: signUpResult,
      error: signUpError,
    } = await signUp(email, password);

    if (signUpError) {
      console.log(signUpError);
      if (signUpError.code === 'auth/email-already-in-use') {
        toast.error("L'utilisateur existe déjà.");
      } else {
        // Autres types d'erreurs
        toast.error("Une erreur s'est produite lors de l'inscription.");
      }
      return;
    }
    
    const userDoc = await getDocument("users", uid);

    if (userDoc && userDoc.result.exists()) {
      toast.error("L'utilisateur existe déjà.");
      // User document already exists, no need to do anything else
      console.log("User document already exists, skipping creation");

      return router.push("/dashboard");
    }

    // create new user document with piec
    const { result: dataResult, error: dataError } = await addData(
      "users",
      uid,
      data
    );

    if (dataError) {
      console.log(dataError);
      return;
    }

    console.log("Created new user document with piec");

    return router.push("/dashboard");
  };

  const handleRememberMe = () => {
    setCkeck(!check);
  };


  const handlegoogle = async (e) => {
    e.preventDefault();

    const { user, error: loginError } = await GoogleLogin();

    if (loginError) {
      console.log(loginError);
      return;
    }

    const userDoc = await getDocument("users", user.uid);

    if (userDoc && userDoc.result.exists()) {
      console.log("User document already exists, skipping creation");
      
      return router.push("/dashboard");
    }

    const data = {
      email: user.email,
      pseudo: user.displayName,
      piec: "3",
      blocked: false,
    };

    const { result: dataResult, error: dataError } = await addData(
      "users",
      user.uid,
      data
    );

    if (dataError) {
      console.log(dataError);
      return;
    }

    router.push("/dashboard");
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Créer un compte
          </h2>
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <form
              className="space-y-6"
              action="#"
              method="POST"
              onSubmit={handleForm}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    required
                    className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Mot de passe
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="repeat-password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Répéter le mot de passe
                </label>
                <div className="mt-2">
                  <input
                    id="repeat-password"
                    name="repeat-password"
                    type="password"
                    autoComplete="new-password"
                    onChange={(e) => setRepeatPassword(e.target.value)}
                    required
                    className={`block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${password !== repeatPassword ? 'ring-red-600' : ''}`}                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {/* <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    checked={check}
                    onChange={handleRememberMe}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600 "
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-3 block text-sm leading-6 text-gray-900"
                  >
                    Accepter les termes et conditions
                  </label> */}
                </div>

                <div className="text-sm leading-6">
                  <Link
                    href="/auth/login"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Déja inscrit ?
                  </Link>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Continuer
                </button>
              </div>
            </form>

            <div>
              <div className="relative mt-10">
                <div
                  className="absolute inset-0 flex items-center"
                  aria-hidden="true"
                >
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm font-medium leading-6">
                  <span className="bg-white px-6 text-gray-900">
                    Ou continuer avec
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-4">
                <button
                  onClick={handlegoogle}
                  className="flex w-full items-center shadow-md justify-center bg-slate-50 gap-3 rounded-md bg- px-3 py-1.5 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D9BF0] hover:bg-slate-100 "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-7 w-7"
                      viewBox="0 0 48 48"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill="#FFC107"
                        d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                      />
                      <path
                        fill="#FF3D00"
                        d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                      />
                      <path
                        fill="#4CAF50"
                        d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                      />
                      <path
                        fill="#1976D2"
                        d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                      />
                    </svg>
                    <span className="text-sm font-semibold leading-6 text-gray-600">
                      Connexion avec Google
                    </span>
                </button>

      
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
}
