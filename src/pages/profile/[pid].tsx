import { useEffect, useState } from "react";
import InputCreditDrawer from "@/components/InputCreditDrawer";
import { useRouter } from "next/router";
import axios from "axios";
import { Header, Container, Title } from "@mantine/core";
import Link from "next/link";

export default function Profile() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  const { pid } = router.query;

  useEffect(() => {
    if (!pid) return;
    const getUser = async () => {
      const res = await axios.get(`/api/fetch-user/${pid}`);
      console.log("RES", res);
      setData(res.data);
      setLoading(false);
    };
    getUser();
  }, [pid]);

  return (
    <>
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
      <div className="flex flex-col items-center justify-center">
        <InputCreditDrawer user={data} loading={loading} />
      </div>
    </>
  );
}
