import Link from "next/link";
import Image from "next/image";

export default function Cta() {
  return (
    <div className="overflow-hidden bg-white py-32">
      <div className="mx-auto max-w-7xl px-6 lg:flex lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-12 gap-y-16 lg:mx-0 lg:min-w-full lg:max-w-none lg:flex-none lg:gap-y-8">
          <div className="lg:col-end-1 lg:w-full lg:max-w-lg lg:pb-8">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Explorez de nouveaux horizons
              </h2>
            <p className="mt-6 text-xl leading-8 text-gray-600 ">
            Commencez dès maintenant votre transformation d'intérieur et créez des générations d'intérieurs exceptionnelles !
            </p>
            <p className="mt-6 text-base leading-7 text-gray-600 text-justify">
            Ne laissez pas vos idées rester seulement sur papier ou dans votre imagination. Utilisez notre solution de génération d'images basée sur le machine learning pour concrétiser vos concepts et visualiser votre projet avant même de commencer les travaux. Simplifiez le processus de conception d'intérieur et faites preuve d'audace dans vos choix grâce à notre technologie révolutionnaire.
            </p>
            <div className="mt-10 flex">
              <Link
                href="/dashboard"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Commencer <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
          <div className="flex flex-wrap items-start justify-end gap-6 sm:gap-8 lg:contents">
            <div className="w-0 flex-auto lg:ml-auto lg:w-auto lg:flex-none lg:self-end">
              <Image
                src="https://images.unsplash.com/photo-1670272502246-768d249768ca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1152&q=80"
                alt=""
                className="aspect-[7/5] w-[37rem] max-w-none rounded-2xl bg-gray-50 object-cover"
                width={1152}
                height={806}
              />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
