import { AppShell, Header, Container, Text, Title, Space, Table } from '@mantine/core';

export default function AccountPage() {
  const transactions = [
    { merchant: "Example 1", date: new Date("2022-02-10"), amount: "$28.50" },
    { merchant: "Example 2", date: new Date("2022-02-11"), amount: "-$42.00" },
    { merchant: "Example 3", date: new Date("2022-02-12"), amount: "$19.99" },
    { merchant: "Example 4", date: new Date("2022-02-13"), amount: "10.00" },
    { merchant: "Example 5", date: new Date("2022-02-14"), amount: "87.50" }
  ];

  const rows = transactions.map((transaction) => (
    <tr key={transaction.merchant}>
      <td>{transaction.merchant}</td>
      <td>{transaction.date.toLocaleDateString('en-us', { year:"numeric", month:"short", day:"numeric", hour:"2-digit", minute:"2-digit"}) }</td>
      <td>{transaction.amount}</td>
    </tr>
  ));

  return (
      <><Space h="xl" /><Container mt='xl'>
      <Text fz="md" color={'gray'}>Account Balance</Text>
      <Title order={1} color={'black'}>$257</Title>
    </Container><Container mt='xl'>
        <Text fz="md" color={'gray'}>Transaction History</Text>
        <Table verticalSpacing="md" highlightOnHover>
          <thead>
            <tr>
              <th>Merchant</th>
              <th>Date</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </Container></>
  );
}