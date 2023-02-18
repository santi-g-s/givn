import {
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import axios from "axios";
import { auth } from "../firebase";

export async function signup(
  firstName: string,
  lastName: string,
  dateOfBirth: Date,
  email: string,
  password: string
) {
  const { data } = await axios.post("/api/create-user", {
    firstName,
    lastName,
    dateOfBirth,
    email,
    password,
  });
  return data;
}

export function login(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function logout() {
  return signOut(auth);
}

export function resendVerification(currentUser: User | null) {
  if (currentUser) {
    return sendEmailVerification(currentUser);
  }
  return null;
}
