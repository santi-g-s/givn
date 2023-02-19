import { Container, Skeleton, Space } from '@mantine/core';

export default function ProfilePage() {
  return (
    <>
        <Space h="xl" />
        <Container>
            <Skeleton height={50} circle mb="xl" />
            <Skeleton height={8} radius="xl" />
            <Skeleton height={8} mt={6} radius="xl" />
            <Skeleton height={8} mt={6} width="70%" radius="xl" />
        </Container>
        </>
  );
}