import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Newbie Interpreter</title>
        <meta name="description" content="newbie interpreter" />
        <link
          rel="icon"
          href={`${
            process.env.NODE_ENV === "production" ? "/newbie-interpreter" : ""
          }/favicon.ico`}
        />
      </Head>
      <main>
        <Component {...pageProps} />
      </main>
      <div className="footer">
        <a
          className="title"
          rel="noreferrer"
          href="https://github.com/binhphanhai/newbie-interpreter"
          target="_blank"
        >
          Source code
        </a>
      </div>
    </>
  );
}
export default MyApp;
