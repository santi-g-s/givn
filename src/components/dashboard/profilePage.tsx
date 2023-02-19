import { useAuth } from '@/contexts/AuthContext';
import { Container, Skeleton, Space, Title } from '@mantine/core';

export default function ProfilePage() {

  const auth = useAuth();

  return (
    <>
      <Space h="xl" />
      <Container>
        <Title my="xl">
          Your Profile
        </Title>
        {auth?.currentUser?.email}
      </Container>
      <Container>
        <button
          onClick={async () => {
            await auth?.logout();
          }}
          type="button"
          className="border rounded-lg py-2 text-left px-4 w-fit hover:bg-blue-500 hover:border-white hover:text-white transition"
         >
          Logout
        </button>
      </Container>
    </>
  );
}