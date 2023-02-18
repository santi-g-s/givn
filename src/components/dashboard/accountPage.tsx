import { AppShell, Header, Container, Text, Title, Space, Table, Skeleton } from '@mantine/core';
import axios from "axios"
import ActivityTable from '@/components/dashboard/activity.jsx';
import { useEffect, useState } from 'react';

interface AccountPageProps {
  customerID: string
}

export default function AccountPage({customerID} : AccountPageProps) {

  const [accountID, setAccountID] = useState('');
  const [accountBalance, setAccountBalance] = useState(0);

  const fetchData = async () => {
    const res =  await axios.get(`${process.env.NEXT_PUBLIC_UNIT_API_URL}/accounts?filter[customerId]=${customerID}`, {
      headers: {
        'Authorization': 'Bearer '+ process.env.NEXT_PUBLIC_UNIT_TOKEN
      }
    })
    setAccountID(res.data.data[0].id);
    setAccountBalance(parseInt(res.data.data[0].attributes.balance))
    console.log(res.data.data[0]);
  }

  useEffect(() => {
    fetchData();
    }, []
  );

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });

  return (
    <>
      <Space h="xl" />
      
      {
        (accountID != '') ? (
          <>
            <Container mt='xl'>
              <Text className="text-gray-400">Account Balance</Text>
              <Text className="text-7xl my-5">{formatter.format(accountBalance)}</Text>
            </Container><Container mt='xl'>
              <ActivityTable account_id={accountID} />
            </Container>
          </>
        ) : 
        (
          <Container>
            <Skeleton height={8} mt={6} radius="sm" width="10%"/>
            <Skeleton height={50} mt={6} radius="sm" width="30%" />

            <Space h="xl" />

            <Skeleton height={16} mt={6} width="100%" radius="sm" />
            <Skeleton height={16} mt={6} width="100%" radius="sm" />
            <Skeleton height={16} mt={6} width="100%" radius="sm" />
          </Container>
        )
      }
      
    </>
  );
}