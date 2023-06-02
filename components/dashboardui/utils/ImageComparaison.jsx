import { ImgComparisonSlider } from "@img-comparison-slider/react";
import BeforeState from "@/assets/afterhouse.png";

import AfterHouse from "@/assets/before.jpg";
import Image from "next/image";
import Loading from "./Loading";

export default function ImageComparaison({ imageBefore, imageAfter }) {
  return (
    <>
      {imageAfter && (
        <>
          {(imageAfter.status === "processing" ||
            imageAfter.status === "starting") && (
            <div className="w-auto h-auto flex flex-col items-center justify-center absolute top-[40%] transform transition-y-[0%] ">
              <div className="loadering">
                <span className="inline-flex items-center gap-x-0.5 rounded-md  px-2 py-1 text-2xl font-semibold text-gray-900">
                  CHARGEMENT EN COURS <span class="bullets">.</span>
                </span>
              </div>
              <Loading />
            </div>
          )}
          {imageAfter.output && (
            <ImgComparisonSlider>
              <img
                slot="first"
                className="rounded-lg max-h-[450px]  border border-solid border-gray-400"
                src={imageBefore}
                alt="image-avant-generation"
              />
              <img
                slot="second"
                className="rounded-lg max-h-[450px]  border border-solid border-gray-400"
                src={imageAfter.output[imageAfter.output.length - 1]}
                alt="image-apres-generation"
              />
            </ImgComparisonSlider>
          )}
        </>
      )}

      {!imageAfter && (
        <ImgComparisonSlider>
          <Image
            slot="first"
            className="rounded-lg max-h-[450px]  border border-solid border-gray-400"
            src={BeforeState}
            alt="image-avant-generation"
          />
          <Image
            slot="second"
            className="rounded-lg max-h-[450px]  border border-solid border-gray-400"
            src={AfterHouse}
            alt="image-apres-generation"
          />
        </ImgComparisonSlider>
      )}
    </>
  );
}
