import { AppShell, Header, Container, Text, Title, Space, Table } from '@mantine/core';
import { useState } from 'react';
import { HeaderResponsive } from '../components/header';
import AccountPage from '@/components/accountPage';

export default function Shell() {

  const links = [
    { "link": "/dashboard/account", "label": "Account"},
    { "link": "/dashboard/payments", "label": "Payments" },
    { "link": "/dashboard/learn", "label": "Learn"}
  ]

  const [active, setActive] = useState(links[0].link);

  return (
    <AppShell
      padding="md"
      header={<Header height={60} p="xs">{
        <HeaderResponsive links={links} activeLink={active} setActiveLink={setActive} />
      }</Header>}
      styles={(theme) => ({
        main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
      })}
    >
      {
        active == "/dashboard/account" ? (<AccountPage />) : (<></>)
      }
      
    </AppShell>
  );
}