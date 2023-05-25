
import sendResetEmail from "@/firebase/Auth/renitialisemp";
import Link from "next/link";
import { useState } from "react";

export default function ForgotPassword() {
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const result = await sendResetEmail(email);
    if (result.success) {
      setMessage(
        "Un e-mail de réinitialisation de mot de passe a été envoyé à votre adresse e-mail."
      );
      setError(null);
    } else {
      setMessage(null);
      setError(
        "Une erreur s'est produite. Veuillez vérifier votre adresse e-mail et réessayer."
      );
    }
  };
  return (
    <>
      <main className="iv od">
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
      </main>
    </>
  );
}

