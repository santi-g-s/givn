import { AppShell, Header, Container, Text, Title, Space, Table } from '@mantine/core';
import { useEffect, useState } from 'react';
import { HeaderResponsive } from '../components/dashboard/header';
import AccountPage from '@/components/dashboard/accountPage';
import ProfilePage from '@/components/dashboard/profilePage';
import CardsPage from '@/components/dashboard/cards';
import { ActionsGrid } from '@/components/dashboard/learn';
import { IconBuildingBank, IconCreditCard, IconBooks } from '@tabler/icons-react';

export default function Shell() {

  const links = [
    { "link": "/dashboard/account", "label": "Account", icon: <IconBuildingBank />},
    { "link": "/dashboard/cards", "label": "Cards", icon: <IconCreditCard /> },
    { "link": "/dashboard/learn", "label": "Learn", icon: <IconBooks />}
  ]

  const [active, setActive] = useState(links[0].link);

  const customerID = "860309"

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
        active == "/dashboard/account" ? (<AccountPage customerID={customerID}/>) : 
        active == "/dashboard/profile" ? (<ProfilePage />):
        active == "/dashboard/cards" ? (<CardsPage customerID={customerID}/>): 
        (<ActionsGrid />)
      }
      
    </AppShell>
  );
}