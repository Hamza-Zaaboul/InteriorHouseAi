import { CreditCardIcon, CurrencyDollarIcon } from "@heroicons/react/20/solid";
import { useContext } from "react";

import Link from "next/link";
import { useAuthContext } from "@/store/AuthContext";

import { MyCoinsContext } from "@/store/MyCoinsContext";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function HeaderExemple({ NameExemple }) {
  const coins = useContext(MyCoinsContext);


  return (
   
    <div className="lg:flex flex-col xl:flex-row justify-start lg:items-center lg:justify-between gap-8">
      <div className="min-w-0 flex-1">
        <h2 className="mt-2 text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          Exemples de {NameExemple}
        </h2>
        <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
          <div className="mt-2 flex items-center text-sm text-gray-500">
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
        <span className="sm:ml-3 block">
          <Link
            href="/pricing"
            className="inline-flex items-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-blue-700"
          >
            <CreditCardIcon
              className="-ml-0.5 mr-1.5 h-5 w-5 text-white"
              aria-hidden="true"
            />
            Acheter Crédits
          </Link>
        </span>
      </div>
    </div>
  );
}
