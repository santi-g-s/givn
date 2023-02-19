import { useAuth } from "@/contexts/AuthContext";
import {
  Container,
  Skeleton,
  Space,
  Title,
  Text,
  Textarea,
  Group,
  TextInput,
  Avatar,
  Button,
  UnstyledButton,
  Modal,
} from "@mantine/core";
import Link from "next/link";
import { IconInfoCircle } from "@tabler/icons-react";
import { useState } from "react";
import { ImagePicker } from "./dropzone";

export default function ProfilePage() {
  const auth = useAuth();

  const [bio, setBio] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [showImagePicker, setShowImagePicker] = useState(false);

  return (
    <>
      <Modal
        centered
        opened={showImagePicker}
        onClose={() => setShowImagePicker(false)}
        title="Change your profile picture"
      >
        <ImagePicker />
      </Modal>

      <Space h="xl" />
      <Container>
        <Title my="xl" className="text-black">
          Your Profile
        </Title>
      </Container>

      <Container>
        <UnstyledButton
          onClick={async () => {
            setShowImagePicker(true);
          }}
        >
          <Avatar src="avatar.png" alt="it's me" size="xl" />
        </UnstyledButton>
      </Container>

      <Container my="xl">
        <Text className="text-gray-400 text-sm">Email</Text>
        <Text className="text-black">{auth?.currentUser?.email}</Text>
      </Container>

      <Container my="xl">
        <Text className="text-gray-400 text-sm">Donation Link</Text>
        <Link href={`/profile/${auth?.currentUser?.uid}`}>
          <Text className="text-blue-500 hover:underline">{`https://givn-five.vercel.app/profile/${auth?.currentUser?.uid}`}</Text>
        </Link>
      </Container>

      <Container my="xl">
        <Text className="text-gray-400 text-sm">First Name</Text>
        <TextInput
          mt="sm"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.currentTarget.value)}
          type="text"
        />
      </Container>

      <Container my="xl">
        <Text className="text-gray-400 text-sm">Last Name</Text>
        <TextInput
          mt="sm"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.currentTarget.value)}
          type="text"
        />
      </Container>

      <Container my="xl">
        <div className="flex justify-between">
          <Text className="text-gray-400 text-sm">Biography</Text>
          <Text className="text-gray-400 text-sm">{`${bio.length} / 250`}</Text>
        </div>

        <Textarea
          value={bio}
          onChange={(event) => setBio(event.currentTarget.value)}
          placeholder="Write a short bio about yourself..."
          autosize
          minRows={2}
          maxLength={250}
          mt="sm"
        />
      </Container>

      <Space h="xl" />
      <Space h="xl" />
      <Container>
        <div className="flex justify-items-end">
          <div className="grow"></div>
          <button
            onClick={async () => {
              await auth?.logout();
            }}
            type="button"
            className="text-black border rounded-lg py-2 text-left px-4 w-fit hover:bg-red-500 hover:border-white hover:text-white transition"
          >
            Logout
          </button>
        </div>
      </Container>
    </>
  );
}
