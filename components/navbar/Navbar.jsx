import { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { signOutUser } from "@/firebase/Auth/logout";
import Logo from "@/assets/Logo.png";
import { useAuthContext } from "@/store/AuthNavContext";
import Image from "next/image";

const navigation = [
  { name: "Fonctionnement", href: "/#Fonctionnement" },
  { name: "Tarifications", href: "/#Tarifications" },
  // { name: "Temoignages", href: "/#Temoignages" },
  { name: "Faq", href: "/#Faq" },
];

export default function Navbar() {
  const { user } = useAuthContext();

  const handleSignOut = () => {
    signOutUser();
  };
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed backdrop-blur-md inset-x-0 top-0 z-50">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between gap-x-6 p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Studioia - Interieur</span>
            <Image
              className="h-12 w-auto "
              src={Logo}
              alt="Studioia - Interieur Logo"
            />
          </Link>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-semibold leading-6 text-black"
            >
              {item.name}
            </Link>
          ))}
        </div>
        {user ? (
          <div className="flex flex-1 items-center justify-end gap-x-6">
            <button
              onClick={handleSignOut}
              className="hidden lg:block lg:text-sm lg:font-semibold lg:leading-6 lg:text-black"
            >
              Deconnexion
            </button>
            <a
              href="/dashboard"
              className="z-100 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Tableau de bord
            </a>
          </div>
        ) : (
          <div className="flex flex-1 items-center justify-end gap-x-6">
            <Link
              href="/auth/sigin"
              className="hidden lg:block lg:text-sm lg:font-semibold lg:leading-6 lg:text-black"
            >
              Inscription
            </Link>

            <Link
              href="/auth/login"
              className=" rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Connexion
            </Link>
          </div>
        )}

        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Ouvrir le menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </nav>

      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center gap-x-6">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-1.5 p-1.5"
            >
              <span className="sr-only">Studioia - interieur</span>
              <Image
              className="h-12 w-auto "
              src={Logo}
              alt="Studioia - Interieur Logo"
            />
            </Link>
            {user ? (
              <a
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="ml-auto rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Tableau de bord
              </a>
            ) : (
              <Link
                onClick={() => setMobileMenuOpen(false)}
                href="/auth/login"
                className="ml-auto rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Connexion
              </Link>
            )}
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Fermer</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="py-6">
                {user ? (
                  <div className="flex  gap-x-6">
                    <button
                      onClick={handleSignOut}
                      className="rounded-md  px-3 py-2 text-sm bg-gray-100 font-semibold text-black shadow-sm hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                    >
                      Deconnexion
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="py-6">
                      <Link
                        onClick={() => setMobileMenuOpen(false)}
                        href="/auth/sigin"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Inscription
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
