import Head from "next/head";
import { useState } from "react";
import Link from "next/link";
import { PasswordInput, TextInput } from "@mantine/core";
import { Inter } from "@next/font/google";
import { withAuthUser, AuthAction } from "next-firebase-auth";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e: any) {
    e.preventDefault();
  }

  return (
    <>
      <Head>
        <title>Givn | Login</title>
        <meta name="description" content="Login" />
      </Head>
      <div className="flex flex-col h-screen justify-center items-center">
        <div className="bg-white min-w-[400px] border rounded-lg flex flex-col p-4 md:p-8 lg:p-12">
          <h1 className="text-2xl md:text-3xl lg:text-4xl text-center font-light pb-4 md:pb-8">
            Login
          </h1>
          <div className="flex flex-col gap-y-2 md:gap-y-4">
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
            <Link
              href="/forgot-password"
              className="text-right text-blue-500 hover:text-blue-700"
            >
              Forgot Password
            </Link>
            <button
              onClick={() => {}}
              type="button"
              className="border rounded-lg py-2 text-left px-4 w-fit hover:bg-blue-500 hover:border-white hover:text-white transition"
            >
              Sign In
            </button>
            <span className="flex mt-4 whitespace-pre-wrap justify-center w-full">
              Don't have an account?{" "}
              <Link
                className="text-right text-blue-500 hover:text-blue-700"
                href="/signup"
              >
                Sign Up
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
})(LoginPage);
