import BeforeState from "@/assets/afterhouse.png";

import AfterHouse from "@/assets/before.jpg";
import Image from "next/image";
import Loading from "./Loading";

export default function Rendu({ imageBefore, imageAfter }) {
  return (
    <>
      {imageAfter && (
        <>
          {(imageAfter.status === "processing" ||
            imageAfter.status === "starting") && (
            <div className="w-auto h-auto flex flex-col items-center justify-center absolute top-[40%] transform transition-y-[0%] ">
              <div className="loadering">
                <span className="inline-flex items-center gap-x-0.5 rounded-md  px-2 py-1 text-2xl font-semibold text-gray-900">
                  CHARGEMENT EN COURS <span className="bullets">.</span>
                </span>
              </div>
              <Loading />
            </div>
          )}

          {imageAfter.output && (
            <div className="w-auto ">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="flex items-center justify-center relative">
                  <img
                    className="h-auto max-w-full max-h-[450px] border border-solid border-gray-400 rounded-lg"
                    src={imageBefore}
                    alt=""
                  />

                  <span className="absolute top-2 left-2">
                    <span className="inline-flex items-center gap-x-0.5 rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
                      Avant
                    </span>
                  </span>
                </div>
                <div className="flex items-center justify-center relative">
                  <img
                    className="h-auto max-w-full max-h-[450px] border border-solid border-gray-400 rounded-lg"
                    src={imageAfter.output[imageAfter.output.length - 1]}
                    alt=""
                  />

                  <span className="absolute top-2 right-2">
                    <span className="inline-flex items-center gap-x-0.5 rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
                      Apres
                    </span>
                  </span>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {!imageAfter && (
        <div className="w-auto ">
          <div className="grid grid-col-1 xl:grid-cols-2 gap-2">
            <div className="flex items-center justify-center relative">
              <Image
                className="h-auto max-w-full max-h-[450px]  border border-solid border-gray-400 rounded-lg"
                src={BeforeState}
                alt=""
              />
              <span className="absolute top-2 left-2">
                {" "}
                <span className="inline-flex items-center gap-x-0.5 rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
                  Avant
                </span>
              </span>
            </div>
            <div className="flex items-center justify-center relative">
              <Image
                className="h-auto max-w-full max-h-[450px]  border border-solid border-gray-400 rounded-lg"
                src={AfterHouse}
                alt=""
              />
              <span className="absolute top-2 right-2">
                {" "}
                <span className="inline-flex items-center gap-x-0.5 rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
                  Apres
                </span>
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
