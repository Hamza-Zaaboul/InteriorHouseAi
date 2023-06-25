import Layout from "@/components/Layout";
import "@/styles/globals.css";
import { Analytics } from '@vercel/analytics/react';

export default function MyApp({ Component, pageProps }) {
  const LayoutComponent = Component.layout || Layout;

  return (
    <LayoutComponent>
      <Component {...pageProps} />
      <Analytics/>
    </LayoutComponent>
  );
}
