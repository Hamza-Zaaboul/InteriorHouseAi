import { CheckIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import stripePromise from "@/utils/stripe";
import Link from "next/link";
import { useAuthContext } from "@/store/AuthNavContext";
import { useRouter } from "next/router";
import getDocument from "@/firebase/Firestore/getData";
import toast, { Toaster } from "react-hot-toast";

const stripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);



const tiers = [
  {
    name: "Starter",
    id: "tier-freelancer",
    href: "/auth/login",
    pricestripe: "price_1NMJepHlXD1yqYgk2wFb9iHn",
    credits: "30",
    priceMonthly: "9€ ",
    btn: "button1",
    description:
      "30 générations d'intérieurs avec tous les thèmes disponibles.",
    features: [],
    mostPopular: false,
  },
  {
    name: "Business",
    id: "tier-startup",
    href: "/auth/login",
    pricestripe: "price_1NMJdRHlXD1yqYgklSHLQ6GW",
    credits: "100",
    priceMonthly: "19€ ",
    btn: "button2",
    description:
      "100 générations d'intérieurs avec tous les thèmes disponibles.",
    features: [],
    mostPopular: true,
  },
  {
    name: " Enterprise",
    id: "tier-enterprise",
    pricestripe: "price_1NKQeaHlXD1yqYgkgY4iDbdU",
    credits: "250",
    href: "/auth/login",
    btn: "button3",
    priceMonthly: "39€ ",
    description:
      "250 générations d'intérieurs avec tous les thèmes disponibles.",
    features: [],
    mostPopular: false,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Pricing({ id }) {
  const router = useRouter();
  const { referral } = router.query;
  const [errorMessage, setErrorMessage] = useState("");
  const [paid, setPaid] = useState(false);

  const { user } = useAuthContext();

  const [blocker, setBLockeur] = useState();

  const [loading, setLoading] = useState({
    button1: false,
    button2: false,
    button3: false,
    button4: false,
  });

  //Bloc de fonction et useEffect pour recupere piec
  const getDocumentData = async () => {
    const { result, error } = await getDocument("users", user.uid);

    if (error) {
      console.error("Error fetching document: ", error);
      return null;
    }

    if (!result.exists) {
      console.error("Document does not exist");
      return null;
    }

    const blockeur = result.data().blocked;

    setBLockeur(blockeur);

    return blockeur;
  };

  const handleCheckout = async (event, priceId, userEmail, buttonName) => {
    event.preventDefault();

    setLoading((prevState) => ({
      ...prevState,
      [buttonName]: true,
    }));

    setErrorMessage("");
    const blockage = await getDocumentData();
    // Utilisez le résultat ici
    console.log(blockage);

    if (user && user.email && blockage === false) {
      try {
        const response = await axios.post("/api/create-checkout-session", {
          priceId,
          userEmail,
          referral: referral,
        });

        const sessionId = response.data.id;
        const stripe = await stripePromise;
        const { error } = await stripe.redirectToCheckout({
          sessionId,
        });

        if (response)
          if (error) {
            setErrorMessage(error.message);
          }
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setLoading((prevState) => ({
          ...prevState,
          [buttonName]: false,
        }));
      }
    } else if (blockage === true) {
      toast.error("Vous avez êtés bloqué, veuillez contacter le support");
    } else {
      // Rediriger vers la page de connexion
      window.location.href = "/auth/login"; // Remplacez "/signin" par l'URL de la page de connexion réelle
    }
  };

  return (
    <div className="bg-white py-24 sm:py-32" id={id}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">
            Tarification
          </h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Choisissez le plan qui vous convient le mieux
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600">
          Nous proposons des plans adaptés à vos besoins du particulier au
          professionnel.
        </p>
        <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {tiers.map((tier, tierIdx) => (
            <div
              key={tier.id}
              className={classNames(
                tier.mostPopular ? "lg:z-10 lg:rounded-b-none" : "lg:mt-8",
                tierIdx === 0 ? "lg:rounded-r-none" : "",
                tierIdx === tiers.length - 1 ? "lg:rounded-l-none" : "",
                "flex flex-col justify-between rounded-3xl bg-white p-8 ring-1 ring-gray-200 xl:p-10"
              )}
            >
              <div>
                <div className="flex items-center justify-between gap-x-4">
                  <h3
                    id={tier.id}
                    className={classNames(
                      tier.mostPopular ? "text-indigo-600" : "text-gray-900",
                      "text-lg font-semibold leading-8"
                    )}
                  >
                    {tier.name}
                  </h3>
                  {tier.mostPopular ? (
                    <p className="rounded-full bg-indigo-600/10 px-2.5 py-1 text-xs font-semibold leading-5 text-indigo-600">
                      Le plus populaire
                    </p>
                  ) : null}
                </div>
                <p className="mt-4 text-sm leading-6 text-gray-600">
                  {tier.description}
                </p>
                <p className="mt-6 flex items-baseline gap-x-1">
                  <span className="text-4xl font-bold tracking-tight text-gray-900">
                    {tier.priceMonthly}
                  </span>
                  <span className="text-sm font-semibold leading-6 text-gray-600">
                    / {tier.credits} crédits
                  </span>
                </p>
                <ul
                  role="list"
                  className="mt-8 space-y-3 text-sm leading-6 text-gray-600"
                >
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <CheckIcon
                        className="h-6 w-5 flex-none text-indigo-600"
                        aria-hidden="true"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              {user ? (
                <button
                  onClick={(event) =>
                    handleCheckout(
                      event,
                      tier.pricestripe,
                      user.email,
                      tier.btn // Utilisez la propriété `btn` du tier
                    )
                  }
                  disabled={loading[tier.btn]} // Utilisez la propriété `btn` du tier pour accéder à la bonne clé dans l'état `loading`
                  aria-describedby={tier.id}
                  className={classNames(
                    tier.mostPopular
                      ? "bg-indigo-600 text-white shadow-sm hover:bg-indigo-500 flex items-center justify-center gap-4"
                      : "text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300 flex items-center justify-center gap-4",
                    "mt-8 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 flex items-center justify-center gap-4"
                  )}
                >
                  
                  {loading[tier.btn] ? "Chargement" : "Acheter"}
                  {loading[tier.btn] ?<div className={classNames(
                    tier.mostPopular ? "download-loader text-white" :"download-loader-purple text-black" )}/> : <></>}
                </button>
              ) : (
                <Link
                  href={tier.href}
                  aria-describedby={tier.id}
                  className={classNames(
                    tier.mostPopular
                      ? "bg-indigo-600 text-white shadow-sm hover:bg-indigo-500"
                      : "text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300",
                    "mt-8 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  )}
                >
                  Commencer
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
      <Toaster />
    </div>
  );
}
