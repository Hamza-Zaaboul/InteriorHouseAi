import Sigin from "@/components/auth/signin";

import Navbar from "@/components/navbar/Navbar";
import Head from "next/head";

export default function SiginIn() {
  return (
    <>
      <Head>
        <title>StudioIA - Inscription</title>
      </Head>
      <Navbar />
      <Sigin />
    </>
  );
}
