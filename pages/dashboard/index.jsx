import Image from "next/image";
import { Inter } from "next/font/google";

import Dashboard from "@/components/dashboard/dashboard";
import NavbarDashboard from "@/components/navbar/NavbarDashboard";
import React, { useEffect } from "react";

import { useRouter } from "next/navigation";
import { useAuthContext } from "@/store/AuthContext";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { user } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (user == null) router.push("/auth/login");
  }, [user]);
  return (
    <>
      <NavbarDashboard />
      <Dashboard />
    </>
  );
}
