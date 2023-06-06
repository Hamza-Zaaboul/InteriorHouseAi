import Image from "next/image";
import { Inter } from "next/font/google";

import React, { useEffect } from "react";

import { useRouter } from "next/navigation";

import Pricing from "@/components/pricing/Pricing";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import Faq from "@/components/faq/Faq";




export default function Home() {


  return (
    <>
      <Navbar />
      <Pricing />
      <Faq />
      <Footer />
    </>
  );
}

