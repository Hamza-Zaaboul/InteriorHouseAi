import Image from "next/image";
import { Inter } from "next/font/google";

import Dashboard from "@/components/dashboard/dashboard";
import NavbarDashboard from "@/components/navbar/NavbarDashboard";
import React, { useEffect, useLayoutEffect } from "react";

import { useRouter } from "next/navigation";
import { useAuthContext } from "@/store/AuthContext";
import DashboardUi from "@/components/dashboardui/dashboard";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { user } = useAuthContext();
  const router = useRouter();

  useLayoutEffect(() => {
    if (user == null) router.push("/auth/login");
  }, [user]);

  return <>{user && <DashboardUi />}</>;
}
