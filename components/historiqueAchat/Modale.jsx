import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  ExclamationTriangleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useAuthContext } from "@/store/AuthContext";

export default function Modale({ openModale, setOpenModale, credit, paymentId,datePayment,email }) {
    const [emailValue, setEmailValue] = useState("");
    const [description, setDescription] = useState("");
    const { user } = useAuthContext();
    const envoyerEmail = async () => {
        try {
          const response = await fetch(
            "https://us-central1-interiorpro-371f7.cloudfunctions.net/sendEmail",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: emailValue,
                subject: `Demande de remboursement housemaker + ${paymentId} + " " + ${datePayment}`,
                message: description,
              }),
            }
          );
          const data = await response.json();
          if (data.success) {
            console.log("Email sent successfully");
          } else {
            console.error("Failed to send email:", data.error);
          }
        } catch (error) {
          console.error("Error sending email:", error);
        }
      };


  return (
    <Transition.Root show={openModale} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpenModale}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={() => {
                        setOpenModale(false);
                      }}
                      
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <ExclamationTriangleIcon
                      className="h-6 w-6 text-red-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 mt-2 text-gray-900"
                    >
                      Requête de rempoursement
                    </Dialog.Title>
                    <div className="mt-2">
                      <h2 className="text-base mt-10 font-semibold leading-7 text-gray-900">
                        Veuillez remplir le formulaire
                      </h2>
                      <p className="mt-1 text-sm leading-6 text-gray-600">
                        Votre requête concernent le produit suivant : {credit}
                      </p>

                      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-full">
                          <label
                            htmlFor="username"
                            className="block text-sm font-medium leading-6 text-gray-900 "
                          >
                            Email
                          </label>
                          <div className="mt-2">
                            <div className="flex w-full rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                              <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
                              <input
                                type="text"
                                name="username"
                                required
                                id="username"
                                autoComplete="username"
                                className="w-full block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                placeholder="Email"
                                value={user.email} // Utilisez la valeur de l'état local
                        
                              />
                            </div>
                          </div>
                        </div>

                        <div className="col-span-full">
                          <label
                            htmlFor="about"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Raison de votre remboursement
                          </label>
                          <div className="mt-2">
                            <textarea
                              id="about"
                              name="about"
                              rows={3}
                              required
                              className="block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        
                              value={description} // Utilisez la valeur de l'état local
                              onChange={(e) => setDescription(e.target.value)} 
                            />
                          </div>
                          <p className="mt-3 text-sm leading-6 text-gray-600">
                            Voir notre{" "}
                            <span className="text-indigo-500">
                              {" "}
                              <Link href="/">politique de remboursement</Link>
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                    onClick={() => {
                        setOpenModale(false);
                        envoyerEmail();
                      }}
                  >
                    Envoyer
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => setOpenModale(false)}
                  >
                    Annuler
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
