import {
  createStyles,
  Card,
  Avatar,
  Text,
  Group,
  Container,
  Button,
  Progress,
  TextInput,
  NativeSelect,
} from "@mantine/core";
import { ButtonProgress } from "./button";
import { useInterval } from "@mantine/hooks";
import { useState } from "react";
import { CurrencyInput } from "../components/transfer_money";
import PaymentDrawer from "./PaymentDrawer";
import InputCreditDrawer from "./InputCreditDrawer";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  avatar: {
    border: `2px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white
    }`,
  },

  button: {
    position: "relative",
    transition: "background-color 150ms ease",
  },

  progress: {
    position: "absolute",
    bottom: -1,
    right: -1,
    left: -1,
    top: -1,
    height: "auto",
    backgroundColor: "transparent",
    zIndex: 0,
  },

  label: {
    position: "relative",
    zIndex: 1,
  },
}));

interface UserCardImageProps {
  image: string;
  avatar: string;
  name: string;
  job: string;
}

export default function UserCardImage({
  image,
  avatar,
  name,
  job,
}: UserCardImageProps) {
  const { classes, theme } = useStyles();
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);

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
    <div className="flex flex-col gap-y-2">
      <Container size="xs" px="xs">
        <Text align="center" size="sm" color="dimmed">
          {job}
        </Text>
      </Container>
      {/* <PaymentDrawer /> */}
      <InputCreditDrawer />
    </div>
  );
}
