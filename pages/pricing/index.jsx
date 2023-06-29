import Image from "next/image";
import { Inter } from "next/font/google";

import React, { useEffect } from "react";

import { useRouter } from "next/navigation";

import Pricing from "@/components/pricing/Pricing";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import Faq from "@/components/faq/Faq";
import Head from "next/head";




export default function Home() {


  return (
    <>
        <Head>
        <title>StudioIA - Tarification</title>
        <link rel="canonical" href="https://www.studioia-interieur.fr/pricing" />
      </Head>
      <Navbar />
      <Pricing />
      <Faq />
      <Footer />
    </>
  );
}

