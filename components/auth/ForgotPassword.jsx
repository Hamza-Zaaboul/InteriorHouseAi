import sendResetEmail from "@/firebase/Auth/renitialisemp";
import Link from "next/link";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function ForgotPassword() {
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const result = await sendResetEmail(email);
    if (result.success) {
      toast.success(
        "Un e-mail de réinitialisation de mot de passe a été envoyé à votre adresse e-mail."
      );

      setMessage(
        "Un e-mail de réinitialisation de mot de passe a été envoyé à votre adresse e-mail."
      );
      setError(null);
    } else {
      toast.error(
        "Une erreur s'est produite. Veuillez vérifier votre adresse e-mail et réessayer."
      );
      setMessage(null);
      setError(
        "Une erreur s'est produite. Veuillez vérifier votre adresse e-mail et réessayer."
      );
    }
  };
  return (
    <>
      {/* <main className="iv od">
        <section>
          <div className="ir th up ht">
            <div className="uz ae pf pl">
              <div className="ia th af ae">
                <h1 className="h2 ah">Changez votre mot de passe</h1>
              </div>

              <div className="iu th">
                <form onSubmit={handleSubmit}>
                  <div className="rr iq ne">
                    <div className="rk">
                      <label className="re fs av ax nu" htmlFor="email">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        className="s rk ft"
                        required=""
                      />
                    </div>
                  </div>
                  {error && <div>{error}</div>}
                  {message && <div>{message}</div>}
                  <div className="al">
                    <button type="submit" className="r fr op lc le">
                      Réinitialiser le mot de passe
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main> */}

      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Réinitialiser votre mot de passe
          </h2>
        </div>

        <div className=" sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <form
              className="space-y-6"
              action="#"
              method="POST"
              onSubmit={handleSubmit}
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
                    autoComplete="email"
                    required
                    className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Envoyer
                </button>
              </div>
            </form>
          </div>

          <p className="mt-10 text-center text-sm text-gray-500">
            Pas encore membre ?{" "}
            <Link
              href="/auth/sigin"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Inscription
            </Link>
          </p>
        </div>
      </div>
      <Toaster />
    </>
  );
}
