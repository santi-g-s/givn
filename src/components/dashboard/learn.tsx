import { createStyles, Card, Text, SimpleGrid, UnstyledButton, Anchor, Group, Container, Modal, Radio, Title, Divider, Space } from '@mantine/core';
import {
  IconCreditCard,
  IconBuildingBank,
  IconRepeat,
  IconReceiptRefund,
  IconReceipt,
  IconReceiptTax,
  IconReport,
  IconCashBanknote,
  IconCoin,
  IconCheckbox,
  IconCircle,
} from '@tabler/icons-react';
import { useState } from 'react';
import LessonModal from './lessonModal';
const mockdata = [
  { title: "Credit cards", icon: IconCreditCard, color: "violet" },
  { title: "Banks nearby", icon: IconBuildingBank, color: "indigo" },
  { title: "Transfers", icon: IconRepeat, color: "blue" },
  { title: "Refunds", icon: IconReceiptRefund, color: "green" },
  { title: "Receipts", icon: IconReceipt, color: "teal" },
  { title: "Taxes", icon: IconReceiptTax, color: "cyan" },
  { title: "Reports", icon: IconReport, color: "pink" },
  { title: "Payments", icon: IconCoin, color: "red" },
  { title: "Cashback", icon: IconCashBanknote, color: "orange" },
  { title: "Spending", icon: IconReceipt, color: "blue" },
];

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[1],
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 700,
  },

  item: {
    borderRadius: theme.radius.md,
    transition: "box-shadow 150ms ease, transform 100ms ease",

    "&:hover": {
      boxShadow: `${theme.shadows.md} !important`,
      transform: "scale(1.05)",
    },
  },
}));

export interface IClass {
    title: string;
    content: string;
    isComplete: boolean;
}

export function ActionsGrid() {
  const { classes } = useStyles();

  const [currentClass, setCurrentClass] = useState<IClass | undefined>(undefined);

  const items = mockdata.map((item) => (
    <UnstyledButton key={item.title} className={classes.item} onClick={async () => {
        setCurrentClass({title: item.title, content: "", isComplete: false});
      }}>
      <Card radius="md">
        {/* <item.icon color={theme.colors[item.color][6]} size={32} /> */}
        <IconCircle></IconCircle>
        <Text size="md" mt={7}>
            {item.title}
        </Text>
      </Card>
    </UnstyledButton>
  ));

  

  return (
    <>
        <LessonModal currentClass={currentClass} setCurrentClass={setCurrentClass}/>
        <Container mt="xl">
        <Card withBorder radius="md" className={classes.card}>
            <Group position="apart">
                <Text className={classes.title}>Lessons</Text>
            </Group>
            <SimpleGrid cols={2} mt="md">
                {items}
            </SimpleGrid>
        </Card>
        </Container>
    </>

  );
}
