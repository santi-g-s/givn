import { Header, Container, Title } from "@mantine/core";
import Link from "next/link";

export default function PublicHeader() {
  return (
    <Header height={72} p="xs">
      <Container className="flex justify-between items-center h-full">
        <Link href="/">
          <Title color={"blue"}>givn</Title>
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
