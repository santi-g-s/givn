import { useState } from "react";
import { Drawer, Button, Group } from "@mantine/core";
import CollectForm from "./InputCredit";

export default function InputCreditDrawer() {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <div className="min-h-screen">
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
          <Button className="bg-blue-500" onClick={() => setOpened(true)}>
            Donate
          </Button>
        </Group>
      </div>
    </>
  );
}
