import "@/styles/globals.css";
import type { AppProps } from "next/app";
import initAuth from "@/initAuth";
import { AuthProvider } from "@/contexts/AuthContext";
import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";

initAuth();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <MantineProvider>
        <NotificationsProvider>
          <Component {...pageProps} />
        </NotificationsProvider>
      </MantineProvider>
    </AuthProvider>
  );
}
