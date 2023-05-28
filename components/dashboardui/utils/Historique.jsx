import getDocument from "@/firebase/Firestore/getData";
import getAllDocuments from "@/firebase/Firestore/getDataUrls";
import getHistoriqueDocument from "@/firebase/Firestore/getDataUrls";
import { useAuthContext } from "@/store/AuthContext";
import { doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import DownloadButtonHistorique from "./DownloadButtonHistorique";

export default function Historique() {
  const { user } = useAuthContext();
  const [dataUrls, setDataUrls] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  const handleGetData = async () => {
    const { result: userData, error: userError } = await getAllDocuments(
      "Archives",
      user.uid,
      "Historique"
    );

    if (userError) {
      console.log(userError);
      return null;
    }
    if (userData) {
      const data = userData.map((document, index) => {
        const urls = document.urls;
        const beforeUrl = urls.before;
        const afterUrl = urls.after;
        const roomUrl = urls.room;
        const themeUrl = urls.theme;

        return {
          id: index + 1,
          before: beforeUrl,
          after: afterUrl,
          room: roomUrl,
          theme: themeUrl,
        };
      });

      setDataUrls(data);

      // Faites quelque chose avec le tableau d'objets "data"
    } else {
      console.log("Le document n'a pas été trouvé.");
    }
  };

  useEffect(() => {
    handleGetData();
  }, []);

  const handleCheckboxChange = (itemId) => {
    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.includes(itemId)) {
        return prevSelectedItems.filter((id) => id !== itemId);
      } else {
        return [...prevSelectedItems, itemId];
      }
    });
  };

  const handleDownload = () => {
    console.log(selectedItems);

    // Faites quelque chose avec les éléments sélectionnés (selectedDataUrls)
  };

  return (
    <div>
      <div className="flex items-center justify-center py-4 md:py-8 w-full">
        <div>
          {dataUrls.map((item) => (
            <div
              key={item.id}
              className="mx-auto mt-6 md:mt-8 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none"
            >
              <div className="relative  w-full">
                <label htmlFor={item.before} className="w-full">
                  <img
                    className="aspect-[3/2] w-full rounded-2xl object-cover"
                    src={item.before}
                    alt={item.room + " " + item.theme}
                  />
                </label>
                <div className="absolute bottom-2 left-4">
                  <input
                    id={item.before}
                    aria-describedby="comments-description"
                    name={item.before}
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    checked={selectedItems.includes(item.before)}
                    onChange={() => handleCheckboxChange(item.before)}
                  />
                </div>

                <span className="absolute top-2 left-2">
                  <span className="inline-flex items-center gap-x-0.5 rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
                    Avant
                  </span>
                </span>
              </div>

              <div className="relative w-full">
                <label htmlFor={item.after} className="w-full">
                  <img
                    className="aspect-[3/2] w-full rounded-2xl object-cover"
                    src={item.after}
                    alt={item.room + " " + item.theme}
                  />
                </label>
                <div className="absolute bottom-2 right-4">
                  <input
                    id={item.after}
                    aria-describedby="comments-description"
                    name={item.after}
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    checked={selectedItems.includes(item.after)}
                    onChange={() => handleCheckboxChange(item.after)}
                  />
                </div>
                <span className="absolute top-2 right-2">
                  {" "}
                  <span
   
                    className="inline-flex items-center gap-x-0.5 rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600"
                  >
                    Apres
                  </span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative md:fixed md:bottom-0 md:right-0  Righteur bg-white py-4">
        <DownloadButtonHistorique listselected={selectedItems}/>
      </div>
    </div>
  );
}
