import Image from "next/image";
import { Inter } from "next/font/google";

import Footer from "@/components/footer/Footer";

import Pricing from "@/components/pricing/Pricing";
import HeroSection from "@/components/herosection/HeroSection";
import Features from "@/components/features/Features";
import Cta from "@/components/cta/Cta";
import Faq from "@/components/faq/Faq";
import Features2 from "@/components/features/Features_2";
import Galerie from "@/components/galerie/Galerie";
import Testimonials from "@/components/testimonials/Testimonials";
import GaleryStyle from "@/components/galerie/GaleryStyle";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <HeroSection />
      <Galerie />
      <Features2 />
      <GaleryStyle/>
       <Testimonials />
      <Pricing />
      <Faq />
      <Cta />
      <Footer />
    </>
  );
}
