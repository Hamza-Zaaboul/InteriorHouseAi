import ForgotPassword from "@/components/auth/ForgotPassword";
import Navbar from "@/components/navbar/Navbar";
import Head from "next/head";




export default function ReinitialiserMotsdePasse() {
  return (
    <>
          <Head>
        <title>StudioIA - Mot de passe oublié</title>
        <link rel="canonical" href="https://www.studioia-interieur.fr/auth/resetmotdepasse" />

      </Head>
        <Navbar/>
          <ForgotPassword />
    
    </>
  );
}
