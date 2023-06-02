import Layout from "@/components/Layout";
import "@/styles/globals.css";

export default function MyApp({ Component, pageProps }) {
  const LayoutComponent = Component.layout || Layout;

  return (
    <LayoutComponent>
      <Component {...pageProps} />
    </LayoutComponent>
  );
}
