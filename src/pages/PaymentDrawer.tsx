import { useState } from 'react';
import { Drawer, Button, Group } from '@mantine/core';
import MyComponent from './payment'

export default function PaymentDrawer() {
  const [opened, setOpened] = useState(false);

  return (
    <>
    <div className="min-h-screen">
      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        title="Register"
        padding="xl"
        size="xl"
      >
        {<MyComponent></MyComponent>}
      </Drawer>

      <Group position="center">
        <Button className='bg-blue-500' onClick={() => setOpened(true)}>Donate</Button>
      </Group>
    </div>
    </>
  );
}