import { Inter } from "next/font/google";

import React, { useEffect } from "react";

import { useRouter } from "next/navigation";
import { useAuthContext } from "@/store/AuthContext";

import DashBoardLayout from "@/components/DashboardLayout";
import OrderHistorique from "@/components/historiqueAchat/Orderhistorique";
import Footer from "@/components/footer/Footer";

import NavbarDash from "@/components/navbar/NavbarDash";
const inter = Inter({ subsets: ["latin"] });

export default function HistoriqueDachat() {
  const { user } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (user == null) router.push("/auth/login");
  }, [user]);

  return (
    <>
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
