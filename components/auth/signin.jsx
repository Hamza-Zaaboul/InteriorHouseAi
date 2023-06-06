import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import signUp from "@/firebase/Auth/signup";
import addData from "@/firebase/Firestore/appData";
import { GoogleLogin } from "@/firebase/Auth/signin";
import getDocument from "@/firebase/Firestore/getData";

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
      console.log("Les mots de passe ne correspondent pas.");
      return;
    }


    const data = {
      email: email,
      pseudo: username,
      nom_prenom: namefull,
      piec: "3",
    };

    const {
      uid,
      result: signUpResult,
      error: signUpError,
    } = await signUp(email, password);

    if (signUpError) {
      console.log(signUpError);
      return;
    }

    const userDoc = await getDocument("users", uid);

    if (userDoc && userDoc.result.exists()) {
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
                  Email address
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
                  Password
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
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
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
                  </label>
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
                  className="flex w-full items-center justify-center gap-3 rounded-md bg-[#1D9BF0] px-3 py-1.5 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D9BF0]"
                >
                  <svg
                    className="h-5 w-5"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                  <span className="text-sm font-semibold leading-6">
                    Google
                  </span>
                </button>

      
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
