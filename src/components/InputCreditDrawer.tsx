import { useState } from "react";
import { Drawer, Button, Group } from "@mantine/core";
import CollectForm from "./InputCredit";

export default function InputCreditDrawer() {
  const [opened, setOpened] = useState(false);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        title="Donate"
        padding="xl"
        size="xl"
        position="bottom"
        classNames={{
          drawer: "h-[75vh]",
        }}
      >
        {<CollectForm />}
      </Drawer>

      <Group position="center">
        <button
          className="px-6 py-3 text-2xl font-light rounded-lg text-white bg-blue-500 hover:bg-blue-700 transition"
          onClick={() => setOpened(true)}
        >
          Donate
        </button>
      </Group>
    </div>
  );
}
