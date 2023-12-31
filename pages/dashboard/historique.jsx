import { Inter } from "next/font/google";

import React, { useEffect } from "react";

import { useRouter } from "next/navigation";
import { useAuthContext } from "@/store/AuthContext";

import DashBoardLayout from "@/components/DashboardLayout";
import OrderHistorique from "@/components/historiqueAchat/Orderhistorique";
import Footer from "@/components/footer/Footer";

import NavbarDash from "@/components/navbar/NavbarDash";
import Head from "next/head";
const inter = Inter({ subsets: ["latin"] });

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function HistoriqueDachat() {
  const { user } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (user == null) router.push("/auth/login");
  }, [user]);

  return (
    <>
      <Head>
        <title>StudioIA - Historique de payment</title>
        <link rel="canonical" href="https://www.studioia-interieur.fr/dashboard/historique" />

      </Head>
      {user && (
        <>
          <NavbarDash />
          <OrderHistorique />
          <Footer />
        </>
      )}
    </>
  );
}

HistoriqueDachat.layout = DashBoardLayout;
