import Image from "next/image";
import background from "@/images/minimalist.jpeg";
import Selecteur from "./utils/Selecteur";
import UploadImage from "./utils/Uploader";
import { uploadFile } from "@/firebase/Storage/storagecustom";
import { useState } from "react";
import ImageComparaison from "./utils/ImageComparaison";
import Rendu from "./utils/Rendu";
import DownloadButton from "./utils/DownloadButton";
import HeaderDashbord from "./headerdashboard";
import { useAuthContext } from "@/store/AuthContext";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const dataDashboard = [
  { name: "Moderne", image: background },
  { name: "Minimaliste", image: background },
  { name: "Professionnel", image: background },
  { name: "Tropical", image: background },

  { name: "Vintage", image: background },
  { name: "Industriel", image: background },
  { name: "Néoclassique", image: background },
  { name: "Minimaliste", image: background },

  { name: "Minimaliste", image: background },
  { name: "Minimaliste", image: background },
  { name: "Minimaliste", image: background },
  { name: "Minimaliste", image: background },
];

const dataListe1 = [
  { id: 0, name: "Moderne", translated: "Modern" },
  { id: 1, name: "Minimaliste", translated: "Minimalist" },
  { id: 2, name: "Professionnel", translated: "Professional" },
  { id: 3, name: "Tropical", translated: "Tropical" },
  { id: 4, name: "Vintage", translated: "Vintage" },
  { id: 5, name: "Industriel", translated: "Industrial" },
  { id: 6, name: "Néoclassique", translated: "Neoclassic" },
];

const dataListe2 = [
  { id: 0, name: "Salon", translated: "Living Room" },
  { id: 1, name: "Salle à manger", translated: "Dining Room" },
  { id: 2, name: "Chambre", translated: "Bedroom" },
  { id: 3, name: "Salle de bain", translated: "Bathroom" },
  { id: 4, name: "Cuisine", translated: "Kitchen" },
  { id: 5, name: "Sous-sol", translated: "Basement" },
  { id: 6, name: "Terrasse extérieure", translated: "Outdoor Patio" },
  { id: 7, name: "Salle de jeu", translated: "Gaming Room" },
];

const dataListe3 = [
  { id: 0, name: "Facile", translated: "Living Room" },
  { id: 1, name: "Nom je suis facile", translated: "Dining Room" },
  { id: 2, name: "Nom je suis facileezae", translated: "Dining Room" },
  { id: 3, name: "Nom je suis facilezarazee", translated: "Dining Room" },
];

const dataListe4 = [
  { id: 0, name: "1", translated: "Living Room" },
  { id: 1, name: "2", translated: "Dining Room" },
  { id: 2, name: "3", translated: "Bedroom" },
  { id: 3, name: "4", translated: "Bathroom" },
  { id: 4, name: "5", translated: "Kitchen" },
  { id: 5, name: "6", translated: "Basement" },
];

const dataListe5 = [
  { id: 0, name: "480px", translated: "Living Room" },
  { id: 1, name: "720p", translated: "Dining Room" },
  { id: 2, name: "HD", translated: "Bedroom" },
  { id: 3, name: "HD", translated: "Bedroom" },
];
export default function Dashboard() {
  const [selectedImage, setSelectedImage] = useState();
  const [outputImage, setOutputImage] = useState();

  const { user } = useAuthContext();

  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);

  const [selectedValue1, setSelectedValue1] = useState(null);
  const [selectedValue2, setSelectedValue2] = useState(null);
  const [selectedValue3, setSelectedValue3] = useState(null);
  const [selectedValue4, setSelectedValue4] = useState(null);
  const [selectedValue5, setSelectedValue5] = useState(null);

  //Sa c'est de la data pour les dropdowns
  const [downloadURL, setDownloadURL] = useState();

  const [uploadStatus, setUploadStatus] = useState(null);
  const [showAttachment, setShowAttachment] = useState(true);

  const handleSelect1 = (value) => {
    setSelectedValue1(value);
    console.log(value);
    // Vous pouvez effectuer d'autres actions avec la valeur sélectionnée ici
  };

  const handleSelect2 = (value) => {
    setSelectedValue2(value);
    console.log(value);
    // Vous pouvez effectuer d'autres actions avec la valeur sélectionnée ici
  };

  const handleSelect3 = (value) => {
    setSelectedValue3(value);
    console.log(value);
    // Vous pouvez effectuer d'autres actions avec la valeur sélectionnée ici
  };

  const handleSelect4 = (value) => {
    setSelectedValue4(value);
    console.log(value);
    // Vous pouvez effectuer d'autres actions avec la valeur sélectionnée ici
  };

  const handleSelect5 = (value) => {
    setSelectedValue5(value);
    console.log(value);
    // Vous pouvez effectuer d'autres actions avec la valeur sélectionnée ici
  };
  const [swiper, setSwiper] = useState(false);

  const handleImageChange = (image) => {
    // Vérifiez si le fichier est correctement récupéré
    setSelectedImage(image);
    console.log(image);
  };

  const handlesetSwiper = (e) => {
    setSwiper(e);
  };
  const handleDownloadURLChange = (newDownloadURL) => {
    setDownloadURL(newDownloadURL);
  };

  const theme = selectedValue1;
  const room = selectedValue2;

  const prompt =
    room === "gaming room" ? "a video gaming room" : `a ${theme} ${room}`;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedImage) {
      try {
        setUploadStatus("uploading");
        const downloadURLFirebase = await uploadFile(selectedImage, user.uid);
        setUploadStatus("success");
        console.log(
          "File uploaded successfully. Download URL:",
          downloadURLFirebase
        );
        handleDownloadURLChange(downloadURLFirebase);
        setShowAttachment(false);
      } catch (error) {
        setUploadStatus("error");
        console.error("Error uploading file:", error);
        setShowAttachment(true);
      }
    }

    try {
      const response = await fetch("/api/predictions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: downloadURL, // Utiliser la valeur de "url" ici
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
      }
    } catch (error) {
      setError("Error during prediction: " + error);
    }
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="Left md:fixed relative md:left-[2px] w-full md:w-[400px] h-96 top-[86px] backgroundrgba border border-solid border-gray-900/25 ">
          <form
            onSubmit={handleSubmit}
            className="LeftSub flex flex-col gap-8 px-4 overflow-x-hidden overflow-y-auto pt-4"
          >
            <div className="LeftSub flex flex-col gap-8 px-4 overflow-x-hidden overflow-y-auto pt-4">
              <h2 className="md:text-xl font-bold subpixel-antialiased">
                Votre interieur
              </h2>

              <UploadImage onImageChange={handleImageChange} />

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

            <div className="md:fixed backdrop-blur-xl w-full md:w-[400px] md:left-[2px] bottom-[159px] p-6 flex items-center justify-center border border-solid border-gray-900/25 ">
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Lancer le rendu
              </button>
            </div>
          </form>
        </div>

        <div className="Right md:fixed  md:right-[2px] relative w-full h-96 top-[86px] backgroundrgba px-12 py-4 border border-solid border-gray-900/25 ">
          <HeaderDashbord onSwiperChange={handlesetSwiper} />
          {prediction && (
            <p className="py-3 text-sm opacity-50">
              status: {prediction.status}
            </p>
          )}

          {error && <div>{error}</div>}
          {!swiper ? (
            <div className="flex mt-8 justify-center w-full h-full">
              <Rendu imageBefore={selectedImage} imageAfter={prediction} />
            </div>
          ) : (
            <div className="flex mt-8 justify-center w-full h-full">
              <ImageComparaison
                imageBefore={selectedImage}
                imageAfter={prediction}
              />
            </div>
          )}

          <div className="flex items-center justify-center w-full h-full">
            <DownloadButton />
          </div>
        </div>

        <div className="Bottom  ">
          {dataDashboard.map((item) => (
            <div key={item.name} className="Widget ">
              <Image
                src={item.image}
                width={832}
                height={512}
                className="ImageBoreder "
              />
              <span className="">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
