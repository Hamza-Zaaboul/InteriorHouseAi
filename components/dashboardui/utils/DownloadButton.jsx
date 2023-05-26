import { useState } from "react";

export default function DownloadButton() {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);

  const handleButtonClick = () => {
    setIsDownloading(true);
    setIsDownloaded(false);
    // Effectuez ici vos opérations de téléchargement

    // Exemple de délai de 2 secondes pour simuler le téléchargement
    setTimeout(() => {
      setIsDownloading(false);
      setIsDownloaded(true);
    }, 2000);
  };

  return (
  <div className="w-full flex items-center justify-center relative h-full py-2">
    <button
      className="download-button buttol transform active:scale-95 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 hover:bg-blue-400 text-white px-[0.30rem] py-[0.50rem] rounded-lg font-bold  md:w-96"
      onClick={handleButtonClick}
      disabled={isDownloading}
    >
      <div className="flex justify-center items-center relative">
        <div className="svg-container">
          {/* Download Icon */}
          <svg
            className={`download-icon ${isDownloading ? "hidden" : ""}  ${isDownloaded ? "hidden" : ""}`}
            width={18}
            height={22}
            viewBox="0 0 18 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              className="download-arrow"
              d="M13 9L9 13M9 13L5 9M9 13V1"
              stroke="#F2F2F2"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M1 17V18C1 18.7956 1.31607 19.5587 1.87868 20.1213C2.44129 20.6839 3.20435 21 4 21H14C14.7956 21 15.5587 20.6839 16.1213 20.1213C16.6839 19.5587 17 18.7956 17 18V17"
              stroke="#F2F2F2"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {/* Loader */}
          {isDownloading && <div className="download-loader text-white" />}

          {/* Checked Icon */}
          {isDownloaded && (
            <svg
              className="check-svg"
              width={20}
              height={20}
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20ZM15.1071 7.9071C15.4976 7.51658 15.4976 6.88341 15.1071 6.49289C14.7165 6.10237 14.0834 6.10237 13.6929 6.49289L8.68568 11.5001L7.10707 9.92146C6.71655 9.53094 6.08338 9.53094 5.69286 9.92146C5.30233 10.312 5.30233 10.9452 5.69286 11.3357L7.97857 13.6214C8.3691 14.0119 9.00226 14.0119 9.39279 13.6214L15.1071 7.9071Z"
                fill="white"
              />
            </svg>
          )}
        </div>

        {/* Texte du bouton */}
        <div className="button-copy pl-2 ">
          {isDownloading
            ? "En cours de téléchargement ..."
            : isDownloaded
            ? "Succès"
            : "Télécharger"}
        </div>
      </div>
    </button>
  </div>
  );
}
