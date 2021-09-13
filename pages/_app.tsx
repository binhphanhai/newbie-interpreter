import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Newbie Interpreter</title>
        <meta name="description" content="newbie interpreter" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Component {...pageProps} />
      </main>
      <footer>footer</footer>
    </>
  );
}
export default MyApp;
