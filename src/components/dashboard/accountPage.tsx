import {
  AppShell,
  Header,
  Container,
  Text,
  Title,
  Space,
  Table,
  Skeleton,
} from "@mantine/core";
import axios from "axios";
import ActivityTable from "@/components/dashboard/activity.jsx";
import { useEffect, useState } from "react";
import handler from "@/pages/api/fetch-user/[pid]";
import { useAuth } from "@/contexts/AuthContext";

export default function AccountPage() {
  const [accountID, setAccountID] = useState("");
  const [accountBalance, setAccountBalance] = useState(0);

  const auth = useAuth();

  const fetchData = async () => {
    if (!auth?.currentUser?.uid) {
      return;
    }
    const resAPI = await axios.get(`/api/fetch-user/${auth?.currentUser?.uid}`);
    console.log(resAPI);
    setAccountID(resAPI.data.user.accountId);

    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_UNIT_API_URL}/accounts/${resAPI.data.user.accountId}`,
      {
        headers: {
          Authorization: "Bearer " + process.env.NEXT_PUBLIC_UNIT_TOKEN,
        },
      }
    );
    setAccountBalance(res.data.data.attributes.balance);
  };

  useEffect(() => {
    fetchData();
  }, [auth?.currentUser]);

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });

  return (
    <>
      <Space h="xl" />

      {accountID != "" ? (
        <>
          <Container my="xl">
            <Text className="text-gray-400">Account Balance</Text>
            <Text className="text-7xl my-5 text-black">
              {(accountBalance / 100).toFixed(2)}
            </Text>
          </Container>
          <Space h="xl" />
          <Container mt="xl">
            <ActivityTable account_id={accountID} />
          </Container>
        </>
      ) : (
        <Container mt="xl">
          <Skeleton height={8} mt={6} radius="sm" width="10%" />
          <Skeleton height={50} mt={6} radius="sm" width="30%" />

          <Space h="xl" />

          <Skeleton height={16} mt={6} width="100%" radius="sm" />
          <Skeleton height={16} mt={6} width="100%" radius="sm" />
          <Skeleton height={16} mt={6} width="100%" radius="sm" />
        </Container>
      )}
    </>
  );
}
