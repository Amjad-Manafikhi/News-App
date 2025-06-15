import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head"
import Navbar from './../components/Navbar';
import NextNProgress from "nextjs-progressbar"


export default function App({ Component, pageProps }: AppProps) {
  return (
    <div  >
      <Head>
        <title key="title" >NextJs News App</title>
        <meta name="description" content="NextJs Crash Course"/>
      </Head>
      <NextNProgress/>
      <Navbar/>
      <div className="p-16">
        <Component {...pageProps} />

      </div>
    </div>
  );
}
