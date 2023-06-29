import Login from "@/components/auth/login";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import Head from "next/head";

export default function Logine() {
  return (
    <>
      <Head>
        <title>StudioIA - Connexion</title>
        <link rel="canonical" href="https://www.studioia-interieur.fr/auth/login" />

      </Head>
      <Navbar />
      <Login />
    </>
  );
}
