import Image from "next/image";
import { Inter } from "next/font/google";
import HeroSections from "@/components/herosection/HeroSection";
import Features, { SecondaryFeatures } from "@/components/features/Features";
import Testimonials from "@/components/testimonials/Testimonials";
import Footer from "@/components/footer/Footer";
import Faq from "@/components/faq/Faq";
import Cta from "@/components/cta/Cta";
import Pricing from "@/components/pricing/Pricing";
import Navbar from "@/components/navbar/Navbar";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>StudioIA - Interieur</title>
      </Head>
      <Navbar />
      <HeroSections />
      <SecondaryFeatures id="Fonctionnement" />
      <Pricing id="Tarification" />
      {/* <Testimonials id="Temoignages" /> */}
      <Faq id="Faq" />
      <Cta />
      <Footer />
    </>
  );
}
