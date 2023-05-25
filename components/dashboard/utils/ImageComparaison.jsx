import { ImgComparisonSlider } from "@img-comparison-slider/react";
import BeforeState from "@/assets/afterhouse.png";

import AfterHouse from "@/assets/before.jpg";
import Image from "next/image";

export default function ImageComparaison({ imageBefore, imageAfter }) {
  return (
    <>
      {imageAfter && (
        <>
          {imageAfter.output && (
            <ImgComparisonSlider>
              <img
                slot="first"
                className="rounded-lg max-h-[450px]  border border-solid border-gray-400"
                src={imageBefore}
              />
              <img
                slot="second"
                className="rounded-lg max-h-[450px]  border border-solid border-gray-400"
                src={imageAfter.output[imageAfter.output.length - 1]}
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
          />
          <Image
            slot="second"
            className="rounded-lg max-h-[450px]  border border-solid border-gray-400"
            src={AfterHouse}
          />
        </ImgComparisonSlider>
      )}
    </>
  );
}
