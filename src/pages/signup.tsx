import Head from "next/head";
import { useState } from "react";
import Link from "next/link";
import { PasswordInput, TextInput } from "@mantine/core";
import { Inter } from "@next/font/google";
import { withAuthUser, AuthAction } from "next-firebase-auth";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");

  function handleSignup(e: any) {
    e.preventDefault();
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
                label="First Name"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.currentTarget.value)}
                type="text"
              />
              <TextInput
                label="Last Name"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.currentTarget.value)}
                type="email"
              />
            </div>
            <TextInput
              label="Email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
              type="email"
            />
            <PasswordInput
              label="Password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
            <button
              onClick={() => {}}
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
  whenAuthed: AuthAction.REDIRECT_TO_APP,
  whenAuthedBeforeRedirect: AuthAction.SHOW_LOADER,
  whenUnauthedBeforeInit: AuthAction.RENDER,
  whenUnauthedAfterInit: AuthAction.RENDER,
  LoaderComponent: null,
})(SignupPage);
