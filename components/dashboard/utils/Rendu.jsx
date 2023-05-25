import BeforeState from "@/assets/afterhouse.png";

import AfterHouse from "@/assets/before.jpg";
import Image from "next/image";

export default function Rendu({ imageBefore, imageAfter }) {
  return (
    <>
      {imageAfter && (
        <>
          {imageAfter.output && (
            <div className="w-auto ">
              <div className="grid grid-cols-2 gap-2">
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
          <div className="grid grid-cols-2 gap-2">
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
