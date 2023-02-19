import {
  createStyles,
  Card,
  Text,
  SimpleGrid,
  UnstyledButton,
  Anchor,
  Group,
  Container,
  Modal,
  Radio,
  Title,
  Divider,
  Space,
} from "@mantine/core";
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
  IconCircleCheck,
  IconCircleCheckFilled,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import LessonModal from "./lessonModal";
import { useAuth } from "@/contexts/AuthContext";
import axios from "axios";
import { showNotification } from "@mantine/notifications";

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

export interface ITask {
  title: string;
  articleText: string;
  isComplete: boolean;
  id: string;
}

export function ActionsGrid() {
  const auth = useAuth();

  const { classes, theme } = useStyles();

  const [currentTask, setCurrentTask] = useState<any | undefined>(undefined);

  const [tasks, setTasks] = useState<any[] | []>([]);

  const fetchData = async () => {
    if (!auth?.currentUser?.uid) {
      return;
    }
    const resAPI = await axios.get(
      `/api/fetch-tasks/${auth?.currentUser?.uid}`
    );
    console.log(resAPI);
    setTasks([]);
    for (let i = 0; i < resAPI.data.result.length; i++) {
      const obj: any = {
        ...resAPI.data.result[i],
        title: resAPI.data.result[i].title,
        articleText: resAPI.data.result[i].articleText,
        id: resAPI.data.result[i].id,
      };
      setTasks((oldArray) => [...oldArray, obj]);
    }
  };

  const items = tasks.map((task) => (
    <UnstyledButton
      disabled={task[auth?.currentUser?.uid || ""]}
      key={task.title}
      className={classes.item}
      onClick={async () => {
        setCurrentTask(task);
      }}
    >
      <Card
        radius="md"
        className={task[auth?.currentUser?.uid || ""] ? "bg-blue-400" : ""}
      >
        {/* <item.icon color={theme.colors[item.color][6]} size={32} /> */}
        {task[auth?.currentUser?.uid || ""] ? (
          <IconCircleCheck color="white"></IconCircleCheck>
        ) : (
          <IconCircle color={theme.colors["blue"][6]}></IconCircle>
        )}
        <Text
          size="md"
          mt={7}
          className={
            task[auth?.currentUser?.uid || ""] ? "text-white" : "text-black"
          }
        >
          {task.title}
        </Text>
      </Card>
    </UnstyledButton>
  ));

  const onSuccess = async (value: ITask) => {
    console.log("success", value);
    const resAPI = await axios.post(`/api/complete-task/`, {
      uid: auth?.currentUser?.uid,
      cityId: "875491",
      taskId: value.id,
    });
    setCurrentTask(undefined);
    console.log(resAPI);
    showNotification({
      autoClose: 3000,
      color: "green",
      title: "Well done!",
      message: `You succesfully completed ${value.title}`,
    });
  };

  useEffect(() => {
    fetchData();
  }, [auth?.currentUser, currentTask]);

  return (
    <>
      <LessonModal
        currentTask={currentTask}
        setCurrentTask={setCurrentTask}
        onSuccess={onSuccess}
      />
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
