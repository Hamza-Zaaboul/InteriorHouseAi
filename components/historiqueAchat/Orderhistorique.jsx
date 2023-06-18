import Link from "next/link";
import Image from "next/image";
import ImageCoins from "@/assets/coins.png";
import { useAuthContext } from "@/store/AuthContext";
import { Fragment, useEffect, useState } from "react";
import getAllDocuments from "@/firebase/Firestore/getDataUrls";
import { loadStripe } from "@stripe/stripe-js";
import stripePromise from "@/utils/stripe";

import { CheckBadgeIcon, Cog8ToothIcon } from "@heroicons/react/24/outline";
import { Menu, Transition } from "@headlessui/react";
import Modale from "./Modale";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import axios from "axios";
import getDocument from "@/firebase/Firestore/getData";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const p1 = "price_1N2iEkHlXD1yqYgkNyebJLvk";
const p2 = "price_1N2iEkHlXD1yqYgkNyebJLvk";
const p3 = "price_1N2iEkHlXD1yqYgkNyebJLvk";

export default function OrderHistorique() {
  const { user } = useAuthContext();
  const [dataIn, setDataIn] = useState([]);
  const router = useRouter();
  const { referral } = router.query;

  const [selectedItems, setSelectedItems] = useState([]);

  const [selectedDataUrls, setSelectedDataUrls] = useState([]);

  const [selectedAfters, setSelectedAfters] = useState([]);

  const [blocker, setBLockeur] = useState();

  const [errorMessage, setErrorMessage] = useState("");

  const [paid, setPaid] = useState(false);

  const [loading, setLoading] = useState({
    button1: false,
    button2: false,
    button3: false,
    button4: false,
  });

  const [openModale, setOpenModale] = useState(false);

  const handleOpenModale = (credit, paymentId, datePayment, email) => {
    setOpenModale(!openModale);
    console.log(credit, paymentId, datePayment, email);
  };

  function convertSecondsToDate(seconds) {
    const date = new Date(seconds * 1000);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    return `${day}/${month}/${year}`;
  }

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

  const handleGetData = async () => {
    const { result: userData, error: userError } = await getAllDocuments(
      "ArchivagePayment",
      user.uid,
      "Achats"
    );

    if (userError) {
      console.log(userError);
      return null;
    }
    if (userData) {
      const data = userData.map((item) => {
        const BigData = item.data;
        const Credit = BigData.creditAmount;
        const Argent = BigData.valeurPayment;
        const IdPayment = BigData.Id_payment;
        const DatePayment = BigData.Numero_Creation;
        const StatusPayment = BigData.Status_Payment;
        const MethodePayment = BigData.Methode_de_Payment;
        const EmailPersonne = BigData.userEmail;

        const dateenjour = convertSecondsToDate(DatePayment);

        return {
          id: item.id,
          Data: BigData,
          Credit: Credit,
          Argent: Argent,
          IdPayment: IdPayment,
          DatePayment: dateenjour,
          StatusPayment: StatusPayment,
          MethodePayment: MethodePayment,
          EmailPersonne: EmailPersonne,
        };
      });
      setDataIn(data);
      console.log(data);
    } else {
      console.log("Le document n'a pas été trouvé.");
    }
  };
  useEffect(() => {
    handleGetData();
  }, []);

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
    console.log(user.email);
    if (user && user.email && blockage === false) {
      try {
        console.log("je suis dans le try");
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
    <div className="bg-white min-h-[80vh] pt-14">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24 ">
        <div className="max-w-2xl">
          <h1
            id="your-orders-heading"
            className="text-3xl font-bold tracking-tight text-gray-900"
          >
            Vos achats
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Historique de vos achats de crédits.
          </p>
        </div>

        <div className="mt-12 space-y-16 sm:mt-16">
          {dataIn.map((item, index) => (
            <section key={item.id} aria-labelledby={`${item.id}-heading`}>
              <div className="space-y-1 md:flex md:items-baseline md:space-x-4 md:space-y-0">
                <h2
                  id={`${item.id}-heading`}
                  className="text-lg font-medium text-gray-900 md:flex-shrink-0"
                >
                  Commande #{index + 1}
                </h2>

                <div className="space-y-5 sm:flex sm:items-baseline sm:justify-between sm:space-y-0 md:min-w-0 md:flex-1">
                  <span className="text-sm font-medium text-gray-500 flex gap-3">
                    <p>{item.DatePayment} </p>

                    {item.StatusPayment === "succeeded" && (
                      <p className="flex gap-2">
                        Validé{" "}
                        <CheckBadgeIcon
                          className="h-5 w-5 text-green-500"
                          aria-hidden="true"
                        />
                      </p>
                    )}
                  </span>

                  <div className="flex text-sm font-medium">
                    {/* <Link
                      href="/"
                      passHref
                      className="text-indigo-600 hover:text-indigo-500"
                    >
                      Voir Facture
                    </Link> */}
                    <div className="ml-4 border-l border-gray-200 pl-4 sm:ml-6 sm:pl-6">
                      <Menu as="div" className="relative">
                        <Menu.Button className="-m-1.5 flex items-center p-1.5">
                          <span className="sr-only">Open user menu</span>

                          <Cog8ToothIcon
                            className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400 hover:text-gray-500"
                            aria-hidden="true"
                          />
                        </Menu.Button>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  onClick={() =>
                                    handleOpenModale(
                                      item.Credit,
                                      item.IdPayment,
                                      item.DatePayment,
                                      item.EmailPersonne
                                    )
                                  }
                                  className={classNames(
                                    active ? "bg-gray-50 w-full" : "",
                                    "block px-3 py-1 text-[0.8rem] leading-6 text-gray-400 w-full"
                                  )}
                                >
                                  Requête de remboursement
                                </button>
                              )}
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                    <Modale
                      openModale={openModale}
                      setOpenModale={setOpenModale}
                      credit={item.Credit}
                      paymentId={item.IdPayment}
                      datePayment={item.DatePayment}
                      email={item.EmailPersonne}
                    />
                  </div>
                </div>
              </div>

              <div className="-mb-6 mt-6 flow-root divide-y divide-gray-200 border-t border-gray-200">
                <div className="py-6 sm:flex">
                  <div className="flex space-x-4 sm:min-w-0 sm:flex-1 sm:space-x-6 lg:space-x-8">
                    <div className="h-20 w-20 flex-none rounded-md overflow-hidden">
                      <Image
                        src={ImageCoins}
                        alt={ImageCoins}
                        layout="responsive"
                        className="object-cover object-center"
                      />
                    </div>
                    <div className="min-w-0 flex-1 pt-1.5 sm:pt-0">
                      <h3 className="text-sm font-medium text-gray-900">
                        <Link href="/"> </Link>
                      </h3>
                      <p>
                        {item.Credit == "20" && (
                          <p className=" text-sm text-gray-500 h-full w-[95%] ">
                            {" "}
                            20 crédits permettant de généré des images à partir
                            d'image d'entrée.{" "}
                          </p>
                        )}

                        {item.Credit == "100" && (
                          <p className=" text-sm text-gray-500 h-full w-[95%] ">
                            {" "}
                            100 crédits permettant de généré des images à partir
                            d'image d'entrée.{" "}
                          </p>
                        )}

                        {item.Credit == "250" && (
                          <p className=" text-sm text-gray-500 h-full w-[95%] ">
                            {" "}
                            250 crédits permettant de généré des images à partir
                            d'image d'entrée.{" "}
                          </p>
                        )}
                      </p>
                      <p className="mt-1 font-medium text-gray-900">
                        {item.Argent} €
                      </p>
                    </div>
                  </div>
                  <div className="mt-6 space-y-4 sm:ml-6 sm:mt-0 sm:w-40 sm:flex-none">
                    {item.Credit == "20" && (
                      <button
                        type="button"
                        onClick={(event) =>
                          handleCheckout(event, p1, user.email, "button2")
                        }
                        className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-2.5 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-full sm:flex-grow-0"
                      >
                        Acheter à nouveau
                      </button>
                    )}
                    {item.Credit == "20" && (
                      <button
                        type="button"
                        onClick={(event) =>
                          handleCheckout(event, p1, user.email, "button2")
                        }
                        className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-2.5 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-full sm:flex-grow-0"
                      >
                        Acheter à nouveau
                      </button>
                    )}
                    {item.Credit == "100" && (
                      <button
                        type="button"
                        onClick={(event) =>
                          handleCheckout(event, p1, user.email, "button2")
                        }
                        className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-2.5 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-full sm:flex-grow-0"
                      >
                        Acheter à nouveau
                      </button>
                    )}
                    {item.Credit == "250" && (
                      <button
                        type="button"
                        onClick={(event) =>
                          handleCheckout(event, p1, user.email, "button2")
                        }
                        className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-2.5 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-full sm:flex-grow-0"
                      >
                        Acheter à nouveau
                      </button>
                    )}

                    <Link
                      href="/pricing"
                      className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-2.5 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-full sm:flex-grow-0"
                    >
                      Voir d'autre forfait
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>
      <Toaster />
    </div>
  );
}
