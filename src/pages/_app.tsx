import "@/styles/globals.css";
import type { AppProps } from "next/app";
import initAuth from "@/initAuth";
import { AuthProvider } from "@/contexts/AuthContext";

initAuth();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
