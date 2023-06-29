import { Inter } from "next/font/google";

import React, { useEffect } from "react";

import { useRouter } from "next/navigation";
import { useAuthContext } from "@/store/AuthContext";
import DashboardUi from "@/components/dashboardui/dashboard";
import DashBoardLayout from "@/components/DashboardLayout";
import Head from "next/head";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { user } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (user == null) router.push("/auth/login");
  }, [user]);

  return <>
      <Head>
        <title>StudioIA - Tableau de bord</title>
        <link rel="canonical" href="https://www.studioia-interieur.fr/dashboard" />

      </Head>
  {user && <DashboardUi />}
  
  </>;
}

Home.layout = DashBoardLayout;
