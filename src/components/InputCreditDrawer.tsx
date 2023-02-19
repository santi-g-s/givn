import { useState } from "react";
import { Drawer, Button, Group } from "@mantine/core";
import CollectForm from "./InputCredit";
import { Skeleton } from "@mantine/core";

export default function InputCreditDrawer(props: any) {
  const [opened, setOpened] = useState(false);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        title=""
        padding="xl"
        size="xl"
        position="bottom"
        classNames={{
          drawer: "h-[75vh]",
        }}
      >
        <CollectForm user={props.user} loading={props.loading} />
      </Drawer>

      <div className="flex flex-col items-center">
        {props.user?.user ? (
          <p className="text-4xl md:text-6xl font-extralight mb-12">
            Donate to {props.user?.user.firstName} {props.user?.user.lastName}
          </p>
        ) : (
          <Skeleton
            className="h-[60px] w-[320px] after:bg-slate-500 rounded mb-12"
            animate
          />
        )}

        <button
          className="px-6 py-3 text-2xl font-light rounded-lg text-white bg-blue-500 hover:bg-blue-700 transition"
          onClick={() => setOpened(true)}
        >
          Donate
        </button>
      </div>
    </div>
  );
}
