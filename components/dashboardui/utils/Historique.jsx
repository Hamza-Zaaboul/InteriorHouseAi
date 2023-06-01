import getDocument from "@/firebase/Firestore/getData";
import getAllDocuments from "@/firebase/Firestore/getDataUrls";
import getHistoriqueDocument from "@/firebase/Firestore/getDataUrls";
import { useAuthContext } from "@/store/AuthContext";
import { doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import DownloadButtonHistorique from "./DownloadButtonHistorique";
import DeletedButton from "./DeletedButton";
import { deleteDocument } from "@/firebase/Firestore/deletData";


export default function Historique() {
  const { user } = useAuthContext();
  const [dataUrls, setDataUrls] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedDataUrls, setSelectedDataUrls] = useState([]);

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
      const data = userData.map((item) => {
        const urls = item.urls;
        const beforeUrl = urls.before;
        const afterUrl = urls.after;
        const roomUrl = urls.room;
        const themeUrl = urls.theme;

        return {
          id: item.id,
          before: beforeUrl,
          after: afterUrl,
          room: roomUrl,
          theme: themeUrl,
        };
      });
      setDataUrls(data);
    } else {
      console.log("Le document n'a pas été trouvé.");
    }
  };

  useEffect(() => {
    handleGetData();
  }, []);

  const handleCheckboxChange = (after, before, docID) => {
    setSelectedItems((prevSelectedItems) => {
      let updatedItems = prevSelectedItems;

      if (prevSelectedItems.includes(after)) {
        updatedItems = updatedItems.filter((id) => id !== after);
      } else {
        updatedItems = [...updatedItems, after];
      }

      if (prevSelectedItems.includes(before)) {
        updatedItems = updatedItems.filter((id) => id !== before);
      } else {
        updatedItems = [...updatedItems, before];
      }

      return updatedItems;
    });

    console.log(selectedItems);

    setSelectedDataUrls((prevSelectedDataUrls) => {
      if (prevSelectedDataUrls.includes(docID)) {
        return prevSelectedDataUrls.filter((id) => id !== docID);
      } else {
        return [...prevSelectedDataUrls, docID];
      }
    });

    console.log(selectedDataUrls);
  };

  const handleDownload = () => {
    console.log(selectedItems);

    // Faites quelque chose avec les éléments sélectionnés (selectedDataUrls)
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center py-4 md:py-8 w-full">
        <div>
          {dataUrls.map((item) => (
            <div key={item.id} className=" mt-16 md:mt-2">
              <div className="mx-auto mt-6 md:mt-8 grid max-w-2xl grid-cols-1 gap-x-6 gap-y-6 md:grid-cols-2 lg:mx-0 lg:max-w-none">
                <div className="relative  w-full">
                  
                  <label htmlFor={item.id} className="w-full">
                    <img
                      className="aspect-[3/2] w-full rounded-2xl object-cover"
                      src={item.before}
                      alt={item.room + " " + item.theme}
                      style={{
                        boxShadow: `${
                          selectedItems.includes(item.after) || selectedItems.includes(item.before)
                            ? "0 0 0 2px rgba(79, 70, 229, 0.5)"
                            : "none"
                        }`,
                      }}
                    />
                  </label>

                  <span className="absolute top-2 left-2">
                    <span className="inline-flex items-center gap-x-0.5 rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
                      Avant
                    </span>
                  </span>
                </div>

                <div className="relative w-full">
                  <label htmlFor={item.id} className="w-full">
                    <img
                      className="aspect-[3/2] w-full rounded-2xl object-cover"
                      src={item.after}
                      alt={item.room + " " + item.theme}
                      style={{
                        boxShadow: `${
                          selectedItems.includes(item.after) || selectedItems.includes(item.before)
                            ? "0 0 0 2px rgba(79, 70, 229, 0.5)"
                            : "none"
                        }`,
                      }}
                    />
                  </label>
                  <div className="absolute bottom-2 right-4">
                    <input
                      id={item.id}
                      aria-describedby="comments-description"
                      name={item.id}
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      
                      checked={
                        selectedItems.includes(item.after) ||
                        selectedItems.includes(item.before)
                      }
                      onChange={() =>
                        handleCheckboxChange(item.after, item.before, item.id)
                      }
                    />
                  </div>
                  <span className="absolute top-2 right-2">
                    {" "}
                    <span className="inline-flex items-center gap-x-0.5 rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
                      Apres
                    </span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="h-56"></div>
      </div>

      <div className="relative md:fixed md:bottom-0 md:right-0 flex flex-col Righteur bg-white py-4">
        <DownloadButtonHistorique listselected={selectedItems} />
        <div className="min-[1341px]:absolute min-[1341px]:right-4  ">
          <DeletedButton
            listselected={selectedDataUrls}
            urlselected = {selectedItems}
            actualiser={handleGetData}
          />
        </div>
      </div>
    </div>
  );
}
