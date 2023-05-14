import { Disclosure } from '@headlessui/react'
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/outline'
const faqs = [
  {
    id: 1,
    question: "Que faites-vous de mes photos après l'entraînement ?",
    answer:
      "Nous formons notre modèle d'IA avec des photos d'entrée, rendons les avatars puis les supprimons ainsi que les modèles de nos serveurs/API GPU dans les 7 jours. Pour supprimer plus rapidement, appuyez simplement sur le bouton 'Supprimer' et nous effacerons toutes les données instantanément.",
  },
  {
    id: 2,
    question: "Qui possède les photos?",
    answer:
      "Vous êtes le propriétaire des photos. Nous vous accordons une licence commerciale complète et la propriété de vos photos. Nous ne les utilisons à aucune autre fin que la formation de notre modèle d'IA, que nous supprimons après 7 jours.",
  },
  {
    id: 3,
    question: "Quel type de photos dois-je télécharger ?",
    answer:
      "Nous recommandons 10 gros plans, 3 profils latéraux, 5 plans poitrine et 3 photos en pied. La variété est essentielle : les expressions faciales, les lieux, les arrière-plans et les perspectives doivent tous être différents. Regardez aussi ailleurs que l'appareil photo. Les photos de haute qualité fonctionnent mieux ; un maquillage minimal est conseillé car il peut être exagéré sur les photos. Pas de nudité, mais les maillots de bain/sous-vêtements sont autorisés.",
  },
  {
    id: 4,
    question: "Où mes données sont-elles stockées ? ",
    answer:
      "Les données sont stockées de manière sécurisée sur des serveurs aux États-Unis, par des partenaires tiers vétérans et hautement sécurisés de notre entreprise.",
  },
  {
    id: 5,
    question: "Puis-je obtenir un remboursement ? ",
    answer:
      "Oui, nous pouvons rembourser les achats effectués dans les 14 premiers jours, à condition que vous n'ayez pas encore entraîné l'IA. Vous pouvez demander un remboursement sur www.headshotpro.com/profile/refund. Veuillez vous référer à nos conditions d'utilisation pour plus de détails.",
  },
  {
    id: 6,
    question: "Quels formats de photo acceptez-vous ?",
    answer:
      "Nous prenons en charge les formats JPG, PNG, WebP et HEIC, mais pas AVIF ou GIF.",
  },
  {
    id: 7,
    question: "Le paiement est-il sécurisé ?",
    answer:
      "Oui, nous utilisons Stripe pour le paiement. Nous ne stockons aucune de vos informations de carte de crédit.",
  },
  {
    id: 8,
    question: "Puis-je utiliser mes photos n'importe où ?",
    answer:
      "Oui, vous pouvez utiliser vos photos n'importe où vous le souhaitez. Nous vous accordons une licence commerciale complète et la propriété de vos photos.",
  },
  {
    id: 9,
    question: "Puis-je obtenir une facture ?",
    answer:
      "Oui, vous pouvez obtenir une facture pour votre achat. Rendez-vous sur la page de la facture après l'achat, ajoutez vos coordonnées et enregistrez-la au format PDF.",
  },
];

export default function Faq() {
  return (
    <div className="bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
        <h2 className="text-2xl font-bold leading-10 tracking-tight text-white">
          F.A.Q
        </h2>
        <p className="mt-6 max-w-2xl text-base leading-7 text-gray-300">
          Vous avez une autre question et vous ne trouvez pas la réponse que
          vous cherchez ? Contactez notre équipe d'assistance en{" "}
          <a
            href="#"
            className="hover:text-indigo-30 font-semibold text-indigo-400 hover:text-indigo-300"
          >
            en nous envoyant un email
          </a>{" "}
          et nous vous répondrons dès que possible.
        </p>
        <div>
        <dl className="mt-10 space-y-6 divide-y divide-white/10">
            {faqs.map((faq) => (
              <Disclosure as="div" key={faq.question} className="pt-6">
                {({ open }) => (
                  <>
                    <dt>
                      <Disclosure.Button className="flex w-full items-start justify-between text-left text-white">
                        <span className="text-base font-semibold leading-7">{faq.question}</span>
                        <span className="ml-6 flex h-7 items-center">
                          {open ? (
                            <MinusSmallIcon className="h-6 w-6" aria-hidden="true" />
                          ) : (
                            <PlusSmallIcon className="h-6 w-6" aria-hidden="true" />
                          )}
                        </span>
                      </Disclosure.Button>
                    </dt>
                    <Disclosure.Panel as="dd" className="mt-2 pr-12">
                      <p className="text-base leading-7 text-gray-300">{faq.answer}</p>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
