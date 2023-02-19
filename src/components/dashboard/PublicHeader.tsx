import { Header, Container, Title } from "@mantine/core";
import Link from "next/link";
import Image from "next/image";

export default function PublicHeader() {
  return (
    <Header height={72} p="xs">
      <Container className="flex justify-between items-center h-full">
        <Link href="/">
          <span className="flex gap-x-4">
            <Image
              src="/logo_no_text.svg"
              alt="Givn Logo"
              width={60}
              height={20}
              priority
            />
            <p className="text-2xl font-light">Givn</p>
          </span>
        </Link>
        <p></p>
        <span className="flex flex-row gap-x-4">
          <Link
            href="/signup"
            className="border transition px-4 py-2 rounded-lg hover:bg-blue-500 hover:border-white font-light hover:text-white"
          >
            Sign Up
          </Link>
          <Link
            href="/login"
            className="border transition px-4 py-2 rounded-lg hover:bg-blue-500 hover:border-white font-light hover:text-white"
          >
            Login
          </Link>
        </span>
      </Container>
    </Header>
  );
}
