const faqs = [
  {
  id: 1,
  question: "Qu'est-ce que StudioAi-Interieur pour la génération d'interieur à l'aide de l'IA ?",
  answer: "StudioAi-Interieur est une plateforme logicielle basée sur le cloud qui utilise des algorithmes d'intelligence artificielle pour créer automatiquement des designs d'intérieur personnalisés.",
  },
  {
  id: 2,
  question: "Quels sont les avantages d'utiliser StudioAi-Interieur pour la génération d'interieur à l'aide de l'IA ?",
  answer: "StudioAi-Interieur offre de nombreux avantages : économie de temps, suggestions créatives personnalisées, visualisation facile des options, découverte de nouvelles idées, meilleure compréhension de l'apparence finale, itération rapide, expérimentation de styles et collaboration efficace avec clients et professionnels.",
  },
  {
  id: 3,
  question: "Quelles sont les limites de StudioAi-Interieur pour la génération d'interieur à l'aide de l'IA?",
  answer: "Bien que StudioAi-Interieur offre de nombreux avantages, il présente également certaines limites : précision variable des suggestions et propositions de design en fonction des données d'entrée et des modèles d'apprentissage, prise en compte limitée des aspects uniques d'un projet ou des préférences spécifiques d'un utilisateur, difficulté à reproduire la créativité et l'intuition humaine dans le processus de conception.",
  },
  {
  id: 4,
  question: "Quelles mesures de sécurité sont mises en place pour garantir la sécurité des transactions ?",
  answer: "Les paiements effectués sont sécurisés. Stripe, notre service de paiement en ligne, utilise des protocoles de cryptage avancés et respecte les normes de sécurité les plus strictes pour protéger vos informations financières.",
  },
  {
  id: 5,
  question: "Quelles mesures de sécurité sont mises en place pour les données utilisateurs et les images déposées ?",
  answer: "Chez StudioAi-Interieur, nous utilisons le service Firebase de Google pour stocker les données utilisateurs et les images déposées. Firebase est réputé pour sa fiabilité et sa sécurité.",
  },
  {
  id: 6,
  question: "Comment optimiser une demande personnalisée ?",
  answer: "Pour optimiser une demande personnalisée, utilisez des mots clés spécifiques et détaillés en anglais. Par exemple, au lieu de demander simplement 'design d'intérieur', spécifiez 'design d'intérieur moderne avec une palette de couleurs neutres et des meubles en bois'. Cela nous aidera à mieux comprendre vos goûts et à créer un design qui correspond parfaitement à vos attentes.",
  },
  // More questions...
  ];

export default function Faq({ id }) {
  return (
    <div id={id} className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-600">
              FAQ
            </h2>
            <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Questions fréquentes
            </p>
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600">
            Une question sur nos services de génération d'image d'interieur ?
          </p>
        </div>

        <div className="mt-20">
          <dl className="space-y-16 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-16 sm:space-y-0 lg:grid-cols-3 lg:gap-x-10">
            {faqs.map((faq) => (
              <div key={faq.id}>
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  {faq.question}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  {faq.answer}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
