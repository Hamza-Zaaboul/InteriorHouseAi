import { Head, Html, Main, NextScript } from "next/document";

export default function Document(props) {
  let pageProps = props.__NEXT_DATA__?.props?.pageProps;

  return (
    <Html
      className="h-full scroll-smooth bg-white antialiased [font-feature-settings:'ss01']"
      lang="en"
    >
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Lexend:wght@400;500&display=swap"
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
        <script
          async
          src="https://r.wdfl.co/rw.js"
          data-rewardful="5b33f3"
        />
      </Head>
      <body className="flex h-full flex-col">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
