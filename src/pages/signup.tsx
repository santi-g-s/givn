import Head from "next/head";
import { useEffect, useState } from "react";
import Link from "next/link";
import { PasswordInput, TextInput } from "@mantine/core";
import { Inter } from "@next/font/google";
import { withAuthUser, AuthAction, useAuthUser } from "next-firebase-auth";
import { DatePicker } from "@mantine/dates";
import axios from "axios";
import { useAuth } from "@/contexts/AuthContext";
import { showNotification, updateNotification } from "@mantine/notifications";
import { useRouter } from "next/router";
import { Timestamp } from "firebase/firestore";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthday, setBirthday] = useState<null | Date>(null);
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = useAuth();
  const authUser = useAuthUser();
  const router = useRouter();

  useEffect(() => {
    if (authUser?.id) {
      router.push("/dashboard");
    }
  }, []);

  async function handleSignup(e: any) {
    if (
      email === "" ||
      password === "" ||
      lastName === "" ||
      firstName === "" ||
      birthday === null
    ) {
      showNotification({
        autoClose: 3000,
        color: "red",
        title: "Error",
        message: "Please fill out all required fields",
      });
      return;
    }

    try {
      setLoading(true);
      showNotification({
        title: "Signing up...",
        message: "Please wait while we create your account",
        loading: true,
        id: "signup",
        autoClose: false,
        disallowClose: true,
      });
      const data = await auth?.signup(email, password);
      const userToken = await data?.user.getIdToken();
      const res = await axios.post("/api/create-user", {
        email,
        firstName,
        lastName,
        birthday,
        password,
        phone,
        idToken: userToken,
      });
      const accountRes = await axios.post("/api/create-deposit-account", {
        cityId: "875491",
        idToken: userToken,
      });

      await axios.post("/api/create-debit-card", {
        address: res.data.user.address,
        accountId: accountRes.data.account.data.id,
        cityId: "875491",
        firstName: res.data.user.firstName,
        lastName: res.data.user.lastName,
        phone: res.data.user.phone,
        countryCode: res.data.user.countryCode,
        idToken: userToken,
        email: res.data.user.email,
        dateOfBirth: new Date(res.data.user.dateOfBirth._seconds * 1000)
          .toISOString()
          .split("T")[0],
      });
      updateNotification({
        color: "green",
        title: "Success!",
        message: "Your account has been created",
        id: "signup",
      });
      router.push("/dashboard");
    } catch (error: any) {
      console.log("error", error.message || "Unknown error");
      updateNotification({
        color: "red",
        title: "Error",
        message: error.message || "Unknown error",
        id: "signup",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Head>
        <title>Givn | Sign Up</title>
        <meta name="description" content="Sign Up" />
      </Head>
      <div className="flex flex-col h-screen justify-center items-center">
        <div className="bg-white min-w-[400px] border rounded-lg flex flex-col p-4 md:p-8 lg:p-12">
          <h1 className="text-2xl md:text-3xl lg:text-4xl text-center font-light pb-4 md:pb-8">
            Sign Up
          </h1>
          <div className="flex flex-col gap-y-2 md:gap-y-4">
            <div className="flex flex-row gap-x-2">
              <TextInput
                required
                label="First Name"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.currentTarget.value)}
                type="text"
              />
              <TextInput
                required
                label="Last Name"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.currentTarget.value)}
                type="email"
              />
            </div>
            <DatePicker
              required
              placeholder="Date of Birth"
              label="Date of Birth"
              value={birthday}
              onChange={setBirthday}
              clearable
              maxDate={new Date()}
            />
            <TextInput
              required
              label="Email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
              type="email"
            />
            <PasswordInput
              required
              label="Password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
            <TextInput
              label="Phone"
              placeholder="(123) 456 7890"
              value={phone}
              onChange={(e) => setPhone(e.currentTarget.value)}
              type="text"
            />
            <button
              disabled={loading}
              onClick={async (e) => await handleSignup(e)}
              type="button"
              className="border rounded-lg py-2 text-left mt-4 px-4 w-fit hover:bg-blue-500 hover:border-white hover:text-white transition"
            >
              Sign Up
            </button>
            <span className="flex mt-4 whitespace-pre-wrap justify-center w-full">
              Have an account?{" "}
              <Link
                className="text-right text-blue-500 hover:text-blue-700"
                href="/login"
              >
                Login
              </Link>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default withAuthUser({
  whenAuthed: AuthAction.RENDER,
  whenAuthedBeforeRedirect: AuthAction.SHOW_LOADER,
  whenUnauthedBeforeInit: AuthAction.RENDER,
  whenUnauthedAfterInit: AuthAction.RENDER,
  LoaderComponent: null,
})(SignupPage);
