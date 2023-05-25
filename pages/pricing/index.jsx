import Image from "next/image";
import { Inter } from "next/font/google";

import React, { useEffect } from "react";

import { useRouter } from "next/navigation";
import { useAuthContext } from "@/store/AuthContext";
import Pricing from "@/components/pricing/Pricing";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import Faq from "@/components/faq/Faq";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { user } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (user == null) router.push("/auth/login");
  }, [user]);
  return (
    <>
      <Navbar />
      <Pricing />
      <Faq/>
      <Footer/>
    </>
  );
}
