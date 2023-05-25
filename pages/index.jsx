import Image from "next/image";
import { Inter } from "next/font/google";
import HeroSections from "@/components/herosection/HeroSection";
import Features, {SecondaryFeatures } from "@/components/features/Features";
import Testimonials from "@/components/testimonials/Testimonials";
import Footer from "@/components/footer/Footer";
import Faq from "@/components/faq/Faq";
import Cta from "@/components/cta/Cta";
import Pricing from "@/components/pricing/Pricing";


const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <HeroSections /> 
      <SecondaryFeatures />
      <Pricing/>
      <Testimonials/>
      <Faq/>
      <Cta/>
      <Footer/>

    </>
  );
}
