import { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";

const frequencies = [
  { value: "monthly", label: "Equipe", priceSuffix: "/ par personne" },
  { value: "annually", label: "Individuel", priceSuffix: "/ séance" },
];
const tiers = [
  {
    name: "Formule Essentielle",
    id: "tier-freelancer",
    href: "#",
    price: { monthly: "29 €", annually: "29 €" },
    description: "Factures et reçus disponibles",
    features: ["40 photos", "1 style", "Délai d'exécution de 2 heures"],
    mostPopular: false,
  },
  {
    name: "Formule Basic",
    id: "tier-startup",
    href: "#",
    price: { monthly: "39 €" , annually: "39 €" },
    description: "Factures et reçus disponibles",
    features: ["120 photos", "3 styles", "Délai d'exécution de 2 heures"],
    mostPopular: true,
  },
  {
    name: "Formule Premium",
    id: "tier-enterprise",
    href: "#",
    price: { monthly: "69 €", annually: "69 €" },
    description: "Factures et reçus disponibles",
    features: ["240 photos", "6 styles", "Délai d'exécution de 2 heures"],
    mostPopular: false,
  },
];
const includedFeatures = [
  "120 photos/personne",
  "40+ poses differentes/personne",
  "20+ styles différents",
  "Délai d'exécution de 2 heures",
];
const tiers2 = [
  {
    name: "Equipe",
    id: "tier-enterprise",
    href: "#",
    price: { monthly: "$48", annually: "$576" },
    description: "Toutes les séances photo incluent",
    features: [
      "120 photos/personne",
      "40+ poses differentes/personne",
      "Délai d'exécution de 2 heures",
    ],
    mostPopular: true,
  },
];
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Pricing() {
  const [frequency, setFrequency] = useState(frequencies[1]);
  const [datalog, setDatalog] = useState(false);

  const handledatalog = () => {
    setDatalog(!datalog);
  };
  console.log(frequency);
  return (
    <div className="bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-400">
            Tarifications
          </h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Plans tarifaires adaptés pour tous
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-300">
          Choisissez un forfait abordable doté des meilleures fonctionnalités.
        </p>
        <div className="mt-16 flex justify-center">
          <RadioGroup
            value={frequency}
            onChange={() => {
              setFrequency(
                frequency === frequencies[0] ? frequencies[1] : frequencies[0]
              );
              handledatalog();
            }}
            className="grid grid-cols-2 gap-x-1 rounded-full bg-white/5 p-1 text-center text-xs font-semibold leading-5 text-white"
          >
            <RadioGroup.Label className="sr-only">
              Payment frequency
            </RadioGroup.Label>
            {frequencies.map((option) => (
              <RadioGroup.Option
                key={option.value}
                value={option}
                className={({ checked }) =>
                  classNames(
                    checked ? "bg-indigo-500" : "",
                    "cursor-pointer rounded-full px-2.5 py-1"
                  )
                }
              >
                <span>{option.label}</span>
              </RadioGroup.Option>
            ))}
          </RadioGroup>
        </div>

        <div
          className={`isolate mx-auto mt-10 ${
            datalog === false
              ? "grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3"
              : "flex max-w-md items-center justify-center lg:mx-0 lg:max-w-none"
          }`}
        >
          {" "}
          {datalog === true ? (
            <div className="mx-auto mt-16 max-w-2xl rounded-3xl bg-white/5 ring-1 ring-white/10 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
              <div className="p-8 sm:p-10 lg:flex-auto">
                <h3 className="text-2xl font-bold tracking-tight text-gray-200">
                  Forfait Équipes Premium
                </h3>

                <p className="mt-6 text-base leading-7 text-gray-100">
                  Pour les équipes de plus de 100 personnes, nous proposons des
                  forfaits sur mesure. Contactez-nous pour en savoir plus.
                </p>
                <div className="mt-10 flex items-center gap-x-4">
                  <h4 className="flex-none text-sm font-semibold leading-6 text-indigo-400">
                  Inclus dans le forfait
                  </h4>
                  <div className="h-px flex-auto bg-gray-300" />
                </div>
                <ul
                  role="list"
                  className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-100 sm:grid-cols-2 sm:gap-6"
                >
                  {includedFeatures.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <CheckIcon
                        className="h-6 w-5 flex-none text-indigo-400"
                        aria-hidden="true"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
                <div className="rounded-2xl bg-white/5  py-10 text-center ring-2 ring-inset ring-indigo-500  lg:flex lg:flex-col lg:justify-center lg:py-16">
                  <div className="mx-auto max-w-xs px-8">
                    <p className="text-xl font-semibold leading-8 text-white">
                    Forfait Équipes Premium
                    </p>
                    <p className="mt-6 flex items-baseline justify-center gap-x-2">
                      <span className="text-5xl font-bold tracking-tight text-gray-100">
                        39 €
                      </span>
                      <span className="text-sm font-semibold leading-6 tracking-wide text-gray-200">
                        / par personne
                      </span>
                    </p>
                    <p class="mt-2 text-xs font-normal text-gray-500">
                      5+ personnes : 20% de réduction <br />
                      10+ personnes : 30% de réduction
                    </p>
                    <a
                      href="#"
                      className="mt-10 block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                           Créer votre équipe
                    </a>
                
                    <p className="mt-6 text-xs leading-5 text-gray-200">
                    Factures et reçus disponibles
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            tiers.map((tier) => (
              <div
                key={tier.id}
                className={classNames(
                  tier.mostPopular
                    ? "bg-white/5 ring-2 ring-indigo-500"
                    : "ring-1 ring-white/10",
                  "rounded-3xl p-8 xl:p-10"
                )}
              >
                <div className="flex items-center justify-between gap-x-4">
                  <h3
                    id={tier.id}
                    className="text-lg font-semibold leading-8 text-white"
                  >
                    {tier.name}
                  </h3>
                  {tier.mostPopular ? (
                    <p className="rounded-full bg-indigo-500 px-2.5 py-1 text-xs font-semibold leading-5 text-white">
                      Populaire
                    </p>
                  ) : null}
                </div>
                <p className="mt-4 text-sm leading-6 text-gray-300">
                  {tier.description}
                </p>
                <p className="mt-6 flex items-baseline gap-x-1">
                  <span className="text-4xl font-bold tracking-tight text-white">
                    {tier.price[frequency.value]}
                  </span>
                  <span className="text-sm font-semibold leading-6 text-gray-300">
                    {frequency.priceSuffix}
                  </span>
                </p>
                <a
                  href={tier.href}
                  aria-describedby={tier.id}
                  className={classNames(
                    tier.mostPopular
                      ? "bg-indigo-500 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline-indigo-500"
                      : "bg-white/10 text-white hover:bg-white/20 focus-visible:outline-white",
                    "mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                  )}
                >
                  Prendre un forfait
                </a>
                <ul
                  role="list"
                  className="mt-8 space-y-3 text-sm leading-6 text-gray-300 xl:mt-10"
                >
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <CheckIcon
                        className="h-6 w-5 flex-none text-white"
                        aria-hidden="true"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
