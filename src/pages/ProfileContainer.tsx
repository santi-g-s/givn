import { createStyles, Card, Avatar, Text, Group, Container, Button, Progress, TextInput, NativeSelect } from '@mantine/core';
import { ButtonProgress } from './button';
import { useInterval } from '@mantine/hooks';
import { useState } from 'react';
import { CurrencyInput } from '../components/transfer_money';
import PaymentDrawer from './PaymentDrawer';
import InputCreditDrawer from './InputCreditDrawer';

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },

  avatar: {
    border: `2px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white}`,
  },

  button: {
    position: 'relative',
    transition: 'background-color 150ms ease',
  },

  progress: {
    position: 'absolute',
    bottom: -1,
    right: -1,
    left: -1,
    top: -1,
    height: 'auto',
    backgroundColor: 'transparent',
    zIndex: 0,
  },

  label: {
    position: 'relative',
    zIndex: 1,
  },  
}));


interface UserCardImageProps {
  image: string;
  avatar: string;
  name: string;
  job: string;
  stats: { label: string; value: string }[];
}

export default function UserCardImage({ image, avatar, name, job, stats }: UserCardImageProps) {
  const { classes, theme } = useStyles();
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const items = stats?.map((stat) => (
    <div key={stat.label}>
      <Text align="center" size="lg" weight={500}>
        {stat.value}
      </Text>
      <Text align="center" size="sm" color="dimmed">
        {stat.label}
      </Text>
    </div>
  ));

  const interval = useInterval(
    () =>
      setProgress((current) => {
        if (current < 100) {
          return current + 1;
        }

        interval.stop();
        setLoaded(true);
        return 0;
      }),
    20
  );

  return (
    <Card withBorder p="xl" radius="md" className={classes.card}>
      <Card.Section sx={{ backgroundImage: `url(${image})`, height: 140 }} />
      <Avatar src={avatar} size={80} radius={80} mx="auto" mt={-30} className={classes.avatar} />
      <Text color={'red'} align="center" size="lg" weight={500} mt="sm">
        {name}
      </Text>
      <Container size="xs" px="xs">
        <Text align="center" size="sm" color="dimmed">
          {job}
        </Text>
      </Container>
      <Group mt="md" mb="xl" position="center" spacing={50}>
        {items}
      </Group>
      {/* <PaymentDrawer /> */}
      <InputCreditDrawer></InputCreditDrawer>
    </Card>
  );
}