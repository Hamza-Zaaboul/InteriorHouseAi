import React, { useState } from "react";
import { PhotoIcon } from "@heroicons/react/24/solid";

const UploadImage = ({ onImageChange, ImageBefored }) => {
  const [previewImage, setPreviewImage] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleImageChange = (file) => {
    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        setPreviewImage(event.target.result);
        onImageChange(file);
        ImageBefored(event.target.result); // Appel de la fonction de rappel avec la valeur de previewImage
      };

      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
      onImageChange(null); // Appel de la fonction de rappel avec null lorsque l'image est supprimée
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);

    const file = e.dataTransfer.files[0];
    handleImageChange(file);
  };

  return (
    <div className="col-span-full">
      <label
        htmlFor="cover-photo"
        className="block font-semibold leading-6 text-gray-900"
      >
        Image
      </label>
      <div
        className={`mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 bg-white px-6 py-10 ${
          isDragOver ? "border-indigo-600" : ""
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="text-center">
          {!previewImage && (
            <PhotoIcon
              className="mx-auto h-12 w-12 text-gray-300"
              aria-hidden="true"
            />
          )}
          {previewImage && (
            <div className="mt-4 mx-auto  text-gray-300">
              <img
                src={previewImage}
                alt="Preview"
                className="max-w-full rounded-lg h-auto max-h-[300px]  border border-solid border-gray-300"
              />
            </div>
          )}
          <div className="mt-4 flex text-sm leading-6 text-gray-600 justify-center">
            <label
              htmlFor="file-upload"
              className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
            >
              <span> Charger un fichier </span>
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                accept=".jpg,.jpeg,.png"
                className="sr-only"
                onChange={(e) => handleImageChange(e.target.files[0])}
              />
            </label>
            <p className="pl-1">ou glisser et déposer</p>
          </div>
          <p className="text-xs leading-5 text-gray-600">
            PNG, JPG, GIF up to 10MB
          </p>
        </div>
      </div>
    </div>
  );
};

export default UploadImage;
