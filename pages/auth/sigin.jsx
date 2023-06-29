import Sigin from "@/components/auth/signin";

import Navbar from "@/components/navbar/Navbar";
import Head from "next/head";

export default function SiginIn() {
  return (
    <>
      <Head>
        <title>StudioIA - Inscription</title>
        <link rel="canonical" href="https://www.studioia-interieur.fr/auth/sigin" />

      </Head>
      <Navbar />
      <Sigin />
    </>
  );
}
