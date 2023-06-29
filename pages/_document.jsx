import { Head, Html, Main, NextScript } from "next/document";

export default function Document(props) {
  let pageProps = props.__NEXT_DATA__?.props?.pageProps;

  return (
    <Html
      className="h-full scroll-smooth bg-white antialiased [font-feature-settings:'ss01']"
      lang="en"
    >
      <Head>
        <meta charSet="utf-8" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <meta
          name="description"
          content="Transformez vos images d'intérieur en designs personnalisés grâce à l'IA. Créez des espaces captivants et uniques !"
        />
        <meta name="robots" content="index" />

        <meta
          name="keywords"
          content="génération d'images d'intérieur, designs personnalisés, IA, espaces captivants, transformations d'images, design d'intérieur"
        />
        <link rel="icon" href="/favicon.ico" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Studioia - Interieur" />
        <meta
          name="twitter:description"
          content="Transformez vos images d'intérieur en designs personnalisés grâce à l'IA. Créez des espaces captivants et uniques !"
        />
        <meta name="twitter:site" content="@hamzzaaboul" />
        <meta
          name="twitter:image"
          content="https://www.studioia-interieur.fr/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FDashbord.05188590.png&w=1920&q=75"
        />
        <meta
          name="twitter:hashtags"
          content="interiordesign, customdesigns, AIgenerated, captivatingspaces"
        />
        <meta name="twitter:url" content="https://www.studioia-interieur.fr" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Lexend:wght@400;500&display=swap"
        />
        <meta
          name="google-site-verification"
          content="7pj6tQINYHN-9105s10zOqhrxOcwaxi8zLu_-5T7ngA"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,r){
                w._rwq=r;
                w[r]=w[r]||function(){
                  (w[r].q=w[r].q||[]).push(arguments);
                };
              })(window,'rewardful');
            `,
          }}
        />
        <script async src="https://js.stripe.com/v3/"></script>
        <script async src="https://r.wdfl.co/rw.js" data-rewardful="5b33f3" />

        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-6G94JDW91Z"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-6G94JDW91Z');
        `,
          }}
        />
      </Head>

      <body className="flex h-full flex-col">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
