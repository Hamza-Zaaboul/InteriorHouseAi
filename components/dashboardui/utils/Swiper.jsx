import { useState } from "react";
import { Switch } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Swiper({ onSwiperChange }) {

  const [enabled, setEnabled] = useState(false);
  const handleToggle = (newEnabled) => {
    setEnabled(newEnabled);
    onSwiperChange(newEnabled); // Appel de la fonction de rappel du composant parent avec la nouvelle valeur
  };
  return (
    <Switch.Group as="div" className="flex items-center justify-between">
      <span className="inline-flex items-center rounded-md bg-white px-3 py-0 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
        <Switch.Label
          as="span"
          className="text-sm font-semibold text-gray-900 mr-4 py-2"
          passive
        >
          Comparateur
        </Switch.Label>
        {/* <Switch.Description as="span" className="text-sm text-gray-500">
          Nulla amet tempus sit accumsan. Aliquet turpis sed sit lacinia.
        </Switch.Description> */}
    
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
  );
}
