import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import PublicHeader from "@/components/dashboard/PublicHeader";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Givn</title>
        <meta name="description" content="Made with ❤️" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PublicHeader />
      <main
        className="flex flex-col justify-center items-center"
        style={{
          height: "calc(100vh - 72px)",
        }}
      >
        <div>
          <Image
            src="/logo.svg"
            alt="Givn Logo"
            width={180}
            height={40}
            priority
          />
        </div>
        <h1 className="mt-8 text-3xl md:text-5xl font-extralight text-center w-1/2">
          Banking for America's Unhoused
        </h1>
      </main>
    </>
  );
}
