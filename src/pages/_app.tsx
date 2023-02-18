import "@/styles/globals.css";
import type { AppProps } from "next/app";
import initAuth from "@/initAuth";

export default function App({ Component, pageProps }: AppProps) {
  initAuth();
  return <Component {...pageProps} />;
}
