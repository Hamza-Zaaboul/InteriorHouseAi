import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { signOutUser } from "@/firebase/Auth/logout";
import Selecteur from "./utils/Selecteur";
import UploadImage from "./utils/Uploader";
import { uploadFile } from "@/firebase/Storage/storagecustom";

import HeaderDashbord from "./headerdashboard";
import { useAuthContext } from "@/store/AuthContext";
import Rendu from "./utils/Rendu";
import ImageComparaison from "./utils/ImageComparaison";
import DownloadButton from "./utils/DownloadButton";
import Historique from "./utils/Historique";
import { uploadAfter } from "@/firebase/Storage/storageAfter";
import ajouterEnsembleUrls from "@/firebase/Firestore/addDataURls";
import DownloadButtonHistorique from "./utils/DownloadButtonHistorique";

//BigData
import {
  teams,
  dataListe1,
  dataListe2,
  dataListe3,
  dataListe4,
  dataListe5,
} from "@/store/BigData";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Dashboard() {
  //useContext pour le users
  const { user } = useAuthContext();

  // State pour le menu latéral
  const [sidebarOpen, setSidebarOpen] = useState(false);

  //State pour le swiper image avant/apres
  const [swiper, setSwiper] = useState(false);

  //State pour l'image deposée par le client
  const [selectedImage, setSelectedImage] = useState();
  const [imageBeforedOn, setImageBeforedOn] = useState();

  // State pour le toggle de l'historique
  const [currentHistorique, setCurrentHistorique] = useState(false);
  const [historique, setHistorique] = useState(false);

  // State pour les dropdowns de selections des parametres
  const [selectedValue1, setSelectedValue1] = useState(null);
  const [selectedValue2, setSelectedValue2] = useState(null);
  const [selectedValue3, setSelectedValue3] = useState(null);
  const [selectedValue4, setSelectedValue4] = useState(null);
  const [selectedValue5, setSelectedValue5] = useState(null);

  // State pour les parametres de theme et de room
  const [theme, setTheme] = useState("Modern");
  const [room, setRoom] = useState("Living Room");

  // State pour les parametres de navigation laterale
  const [blog, setBlog] = useState(true);
  const [navig, setNavig] = useState(true);

  // State pour les parametres de la prediction
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);

  // State pour les parametres de l'upload
  const [downloadURL, setDownloadURL] = useState();

  const [uploadStatus, setUploadStatus] = useState();
  const [showAttachment, setShowAttachment] = useState(true);

  // State pour le lien de l'output de la prediction cote replicate
  const [outputImage, setOutputImage] = useState();

  // State pour le lien de l'output de la prediction cote storage firebase
  const [downloadAfterURL, setDownloadAfterURL] = useState();

  // Fonction pour la deconnexion
  const handleSignOut = () => {
    signOutUser();
  };

  //Fonction pour la navigation lateral
  function handleHistorique() {
    setHistorique(!historique);
    setCurrentHistorique(!currentHistorique);
    console.log(historique);
  }

  function handleNavigation() {
    setNavig(!navig);
  }

  function handleBLog() {
    setBlog(!blog);
  }

  const navigation = [
    {
      name: "Accueil",
      href: "#",
      icon: HomeIcon,
      current: true,
      onClick: handleNavigation,
    },
    {
      name: "Historique",
      href: "#",
      icon: UsersIcon,
      current: currentHistorique,
      onClick: handleHistorique,
    },
    {
      name: "Blog",
      href: "#",
      icon: FolderIcon,
      current: false,
      onClick: handleBLog,
    },
  ];

  //Function pour actualise les dropdowns states
  const handleSelect1 = (value) => {
    setSelectedValue1(value);
    setTheme(value.translated);
  };

  const handleSelect2 = (value) => {
    setSelectedValue2(value);
  };

  const handleSelect3 = (value) => {
    setSelectedValue3(value);
    setRoom(value.translated);
  };

  const handleSelect4 = (value) => {
    setSelectedValue4(value);
  };

  const handleSelect5 = (value) => {
    setSelectedValue5(value);
  };

  //Fonction pour uptade si le fichier est correctement récupéré
  const handleImageChange = (image) => {
    setSelectedImage(image);
  };

  const handleImageBefored = (image) => {
    setImageBeforedOn(image);
  };

  //Fonction pour etat state swiper
  const handlesetSwiper = (e) => {
    setSwiper(e);
  };

  //Fonction pour etat state downloadURL
  const handleDownloadURLChange = (newDownloadURL) => {
    setDownloadURL(newDownloadURL);
  };

  //Fonction pour etat state outputImage
  const handleDownloadURLOutput = (newDownloadURL) => {
    setOutputImage(newDownloadURL);
  };

  //Fonction pour etat state downloadAfterURL
  const handleDownloadAfterURLChange = (newDownloadURL) => {
    setDownloadAfterURL(newDownloadURL);
  };

  //Constante pour le prompt de la prediction
  const prompt =
    room === "gaming room"
      ? "a video gaming room"
      : `a ${theme.toLowerCase()} ${room.toLowerCase()}`;

  //Fonction cerveau de l'application
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedImage) {
      try {
        // Depose l'image de l'input dans le storage firebase
        setUploadStatus("uploading");
        const downloadURLFirebase = await uploadFile(selectedImage, user.uid);
        setUploadStatus("success");
        console.log(
          "File uploaded successfully. Download URL:",
          downloadURLFirebase.url
        );
        handleDownloadURLChange(downloadURLFirebase.url);
        setShowAttachment(false);

        // Appel de l'API de prediction
        if (downloadURLFirebase) {
          try {
            const response = await fetch("/api/predictions", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                image: downloadURLFirebase.url, // Utiliser la valeur de "url" ici
                structure: "hough",
                prompt: prompt,
                scale: 9,
                a_prompt:
                  "best quality, photo from Pinterest, interior, cinematic photo, ultra-detailed, ultra-realistic, award-winning, interior design, natural lighting",
                n_prompt:
                  "longbody, lowres, bad anatomy, bad hands, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality",
              }),
            });

            let prediction = await response.json();
            if (response.status !== 201) {
              setError(prediction.detail);
              return;
            }
            setPrediction(prediction);

            while (
              prediction.status !== "succeeded" &&
              prediction.status !== "failed"
            ) {
              await sleep(1000);
              const response = await fetch("/api/predictions/" + prediction.id);
              prediction = await response.json();

              if (response.status !== 200) {
                setError(prediction.detail);
                return;
              }
              console.log({ prediction });
              setPrediction(prediction);

              // Si la prédiction est réussie, depose l'image de l'ouput dans le storage firebase adequat selon l'user
              if (prediction.status == "succeeded") {
                setUploadStatus("uploading");
                const downloadAfterStatement = await uploadAfter(
                  prediction.output[prediction.output.length - 1],
                  downloadURLFirebase.folderRef,
                  downloadURLFirebase.name
                );
                setUploadStatus("success");
                console.log(
                  "File uploaded successfully. Download URL:",
                  downloadAfterStatement
                );

                handleDownloadAfterURLChange(downloadAfterStatement);

                handleDownloadURLOutput(
                  prediction.output[prediction.output.length - 1]
                );

                // Depose les urls de l'input et de l'output dans la collection Firestore adequat selon l'user
                const urls = {
                  email: user.email,
                  room: room,
                  theme: theme,
                  before: downloadURLFirebase.url,
                  after: downloadAfterStatement,
                };

                await ajouterEnsembleUrls("Archives", user.uid, urls);
              }
            }
          } catch (error) {
            setError("Error during prediction: " + error);
          }
        }
      } catch (error) {
        setUploadStatus("error");
        console.error("Error uploading file:", error);
        setShowAttachment(true);
        return; // Arrêter l'exécution si une erreur s'est produite lors du chargement du fichier
      }
    }
  };

  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-50 lg:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button
                        type="button"
                        className="-m-2.5 p-2.5"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  {/* Sidebar component, swap this element with another sidebar if you like */}
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-2">
                    <div className="flex h-16 shrink-0 items-center">
                      <img
                        className="h-8 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                      />
                    </div>
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            {navigation.map((item) => (
                              <li key={item.name}>
                                <button
                                  href={item.href}
                                  onClick={item.onClick}
                                  className={classNames(
                                    item.current
                                      ? "bg-gray-50 text-indigo-600"
                                      : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50",
                                    "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                  )}
                                >
                                  <item.icon
                                    className={classNames(
                                      item.current
                                        ? "text-indigo-600"
                                        : "text-gray-400 group-hover:text-indigo-600",
                                      "h-6 w-6 shrink-0"
                                    )}
                                    aria-hidden="true"
                                  />
                                  {item.name}
                                </button>
                              </li>
                            ))}
                          </ul>
                        </li>
                        <li>
                          <div className="text-xs font-semibold leading-6 text-gray-400">
                            Exemple
                          </div>
                          <ul role="list" className="-mx-2 mt-2 space-y-1">
                            {teams.map((team) => (
                              <li key={team.name}>
                                <a
                                  href={team.href}
                                  className={classNames(
                                    team.current
                                      ? "bg-gray-50 text-indigo-600"
                                      : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50",
                                    "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                  )}
                                >
                                  <span
                                    className={classNames(
                                      team.current
                                        ? "text-indigo-600 border-indigo-600"
                                        : "text-gray-400 border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600",
                                      "flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white"
                                    )}
                                  >
                                    {team.initial}
                                  </span>
                                  <span className="truncate">{team.name}</span>
                                </a>
                              </li>
                            ))}
                          </ul>
                        </li>

                        <li className="  mt-auto mb-8">
                          {" "}
                          <button
                            onClick={handleSignOut}
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          >
                            Deconnexion
                          </button>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
            <div className="flex h-16 shrink-0 items-center">
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt="Your Company"
              />
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          onClick={item.onClick}
                          className={classNames(
                            item.current
                              ? "bg-gray-50 text-indigo-600"
                              : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50",
                            "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                          )}
                        >
                          <item.icon
                            className={classNames(
                              item.current
                                ? "text-indigo-600"
                                : "text-gray-400 group-hover:text-indigo-600",
                              "h-6 w-6 shrink-0"
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
                <li>
                  <div className="text-xs font-semibold leading-6 text-gray-400">
                    Exemple
                  </div>
                  <ul role="list" className="-mx-2 mt-2 space-y-1">
                    {teams.map((team) => (
                      <li key={team.name}>
                        <a
                          href={team.href}
                          className={classNames(
                            team.current
                              ? "bg-gray-50 text-indigo-600"
                              : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50",
                            "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                          )}
                        >
                          <span
                            className={classNames(
                              team.current
                                ? "text-indigo-600 border-indigo-600"
                                : "text-gray-400 border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600",
                              "flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white"
                            )}
                          >
                            {team.initial}
                          </span>
                          <span className="truncate">{team.name}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
                <li className="-mx-5 mt-auto">
                  {user && (
                    <a
                      href="#"
                      className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-50"
                    >
                      <img
                        className="h-8 w-8 rounded-full bg-gray-50"
                        src={user.photoURL}
                        alt=""
                      />
                      <span className="sr-only">Votre profil</span>
                      <span aria-hidden="true">{user.displayName}</span>
                    </a>
                  )}
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-white px-4 py-4 shadow-sm sm:px-6 lg:hidden">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="flex-1 text-sm font-semibold leading-6 text-gray-900">
            Dashboard
          </div>
          <a href="#">
            <span className="sr-only">Your profile</span>
            <img
              className="h-8 w-8 rounded-full bg-gray-50"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
          </a>
        </div>

        <aside className=" relative md:fixed inset-y-0 md:left-0 lg:left-72 w-full md:w-96 overflow-y-auto border-r border-gray-200 px-2 py-4 xl:block">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-8 overflow-x-hidden overflow-y-auto max-h-[90%]"
          >
            <div className="flex flex-col gap-8 px-4 overflow-x-hidden overflow-y-auto pt-4">
              <h2 className="md:text-xl font-bold subpixel-antialiased">
                VOTRE INTERIEUR
              </h2>

              <UploadImage
                onImageChange={handleImageChange}
                ImageBefored={handleImageBefored}
              />

              <div className="Selecteur w-full">
                <h3 className="block font-semibold leading-6 text-gray-900">
                  Type de pièce
                </h3>
                <Selecteur people={dataListe2} onSelect={handleSelect1} />
              </div>

              <div className="Selecteur w-full">
                <h3 className="block font-semibold leading-6 text-gray-900">
                  Degrée de liberté
                </h3>
                <Selecteur people={dataListe3} onSelect={handleSelect2} />
              </div>

              <div className="Selecteur w-full">
                <h3 className="block font-semibold leading-6 text-gray-900">
                  Style
                </h3>
                <Selecteur people={dataListe1} onSelect={handleSelect3} />
              </div>

              <div className="Selecteur w-full">
                <h3 className="block font-semibold leading-6 text-gray-900">
                  Nombre de rendu
                </h3>
                <Selecteur people={dataListe4} onSelect={handleSelect4} />
              </div>

              <div className="Selecteur w-full">
                <h3 className="block font-semibold leading-6 text-gray-900">
                  Resolution
                </h3>
                <Selecteur people={dataListe5} onSelect={handleSelect5} />
              </div>

              <div className="Selecteur w-full"></div>
              <div className="Selecteur w-full"></div>
            </div>

            <div className="absolute z-50 bottom-0 bg-white w-full left-0 p-6 flex items-center justify-center border-t border-solid border-gray-900/25 ">
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Lancer le rendu
              </button>
            </div>
          </form>
        </aside>

        <main className="lg:pl-72">
          <div className="md:pl-96">
            <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6 h-full relative">
              {/* Main area */}

              <HeaderDashbord onSwiperChange={handlesetSwiper} />
              {prediction && (
                <p className="py-3 text-sm opacity-50">
                  status: {prediction.status}
                </p>
              )}

              {error && <div>{error}</div>}
              {historique === false ? (
                !swiper ? (
                  <div className="flex flex-col mt-8 gap-8 justify-center items-center w-full overflow-y-auto min-h-[700px]">
                    <Rendu
                      imageBefore={imageBeforedOn}
                      imageAfter={prediction}
                    />
                  </div>
                ) : (
                  <div className="flex mt-8 justify-center overflow-y-auto items-center w-full min-h-[700px]">
                    <ImageComparaison
                      imageBefore={imageBeforedOn}
                      imageAfter={prediction}
                    />
                  </div>
                )
              ) : (
                <Historique />
              )}
            </div>
            {historique === false ? (
              <div className="relative md:fixed md:bottom-0 md:right-0  Righteur bg-white py-4">
                <DownloadButton ouput={outputImage} />
              </div>
            ) : (<> </>)}
          </div>
        </main>
      </div>
    </>
  );
}