import { ImgComparisonSlider } from "@img-comparison-slider/react";
import BeforeState from "@/assets/afterhouse.png";

import AfterHouse from "@/assets/before.jpg";
import Image from "next/image";

export default function ImageComparaison() {
  return (
    <>
      <ImgComparisonSlider>
        <div slot="first">
          <Image
            slot="first"
            className="rounded-lg max-h-[450px]  border border-solid border-gray-400"
            src={BeforeState}
            alt="image-avant-generation"
          />
          <span className="absolute top-2 left-2">
            <span className="inline-flex items-center gap-x-0.5 rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
              Avant
            </span>
          </span>
        </div>

        <div slot="second">
          <Image
            slot="second"
            className="rounded-lg max-h-[450px]  border border-solid border-gray-400"
            src={AfterHouse}
            alt="image-apres-generation"
          />
          <span className="absolute top-2 right-2">
            <span className="inline-flex items-center gap-x-0.5 rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
              Après
            </span>
          </span>
        </div>
      </ImgComparisonSlider>
    </>
  );
}
