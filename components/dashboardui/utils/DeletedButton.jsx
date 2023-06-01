import { deleteDocument } from "@/firebase/Firestore/deletData";
import { deleteFilesByURLs } from "@/firebase/Storage/delete";
import { useAuthContext } from "@/store/AuthContext";
import { TrashIcon } from "@heroicons/react/24/solid";

export default function DeletedButton({urlselected, listselected, actualiser }) {
  const { user } = useAuthContext();

  const handleButtonClick = async () => {
    try {
      try {
      await deleteFilesByURLs(urlselected);
      }
      catch (error) {
        console.error(error);
      }


      for (const itemId of listselected) {
        console.log(`Tentative de suppression de l'élément ${itemId}.`);
        await deleteDocument("Archives", user.uid, "Historique", itemId);
        actualiser();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full flex items-center justify-center relative h-full py-2">
      <span className="ml-3 block">
        <button
          onClick={handleButtonClick}
          className="inline-flex items-center rounded-md bg-gray-400 px-3 py-2.5 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-500"
        >
          <TrashIcon
            className="-ml-0.5 mr-1.5 h-5 w-5 text-white"
            aria-hidden="true"
          />
          Supprimer
        </button>
      </span>
    </div>
  );
}
