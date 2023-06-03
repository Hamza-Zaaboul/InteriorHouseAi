import { CreditCardIcon, CurrencyDollarIcon } from "@heroicons/react/20/solid";
import { useContext, useState } from "react";
import { Switch } from "@headlessui/react";
import Link from "next/link";

import { MyCoinsContext } from "@/store/MyCoinsContext";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function HeaderDashbord({ onSwiperChange }) {
  const [enabled, setEnabled] = useState(false);
  const coins = useContext(MyCoinsContext);

  const handleToggle = (newEnabled) => {
    setEnabled(newEnabled);
    onSwiperChange(newEnabled); // Appel de la fonction de rappel du composant parent avec la nouvelle valeur
  };

  return (
    <div className="lg:flex flex-col xl:flex-row justify-start lg:items-center lg:justify-between gap-8">
      <div className="min-w-0 flex-1">
        <h2 className="mt-2 text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          Résultats
        </h2>
        <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
          <div className="mt-2 flex items-center text-lg text-gray-500">
            <CurrencyDollarIcon
              className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
              aria-hidden="true"
            />
            {coins} crédits
          </div>
          <div className="mt-2 flex items-center text-sm text-gray-500"></div>
        </div>
      </div>
      <div className="mt-5 flex lg:ml-4 lg:mt-0 md:flex-wrap justify-start items-start">
        <span className="block">
          <Switch.Group as="div" className="flex items-center justify-between">
            <span className="inline-flex items-center rounded-md bg-white px-3 py-0 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
              <Switch.Label
                as="span"
                className="text-sm font-semibold text-gray-900 mr-4 py-2"
                passive
              >
                Comparateur
              </Switch.Label>

              <Switch
                checked={enabled}
                onChange={handleToggle}
                className={classNames(
                  enabled ? "bg-indigo-600" : "bg-gray-200",
                  "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
                )}
              >
                <span
                  aria-hidden="true"
                  className={classNames(
                    enabled ? "translate-x-5" : "translate-x-0",
                    "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                  )}
                />
              </Switch>
            </span>
          </Switch.Group>
        </span>

        <span className="sm:ml-3 block">
          <Link
            href="/pricing"
            className="inline-flex items-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-blue-700"
          >
            <CreditCardIcon
              className="-ml-0.5 mr-1.5 h-5 w-5 text-white"
              aria-hidden="true"
            />
            Acheter Credits
          </Link>
        </span>
      </div>
    </div>
  );
}
