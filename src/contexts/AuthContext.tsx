import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import {
  confirmPasswordReset,
  User,
  UserCredential,
  verifyBeforeUpdateEmail,
  sendPasswordResetEmail,
} from "firebase/auth";

import { auth } from "../firebase";
import {
  login,
  logout as authLogout,
  resendVerification,
} from "../services/auth.service";

interface AuthContextProps {
  changeVerificationEmail: (user: User, email: string) => Promise<void>;
  emailLogin: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
  resendEmailVerification: () => Promise<void> | null;
  updatePasswordWithReset: (code: string, password: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  currentUser: User | null;
}

const AuthContext = createContext<AuthContextProps | null>(null);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  function emailLogin(email: string, password: string) {
    return login(email, password);
  }

  async function logout() {
    return authLogout();
  }

  async function changeVerificationEmail(user: User, email: string) {
    return verifyBeforeUpdateEmail(user, email);
  }

  async function updatePasswordWithReset(code: string, password: string) {
    return confirmPasswordReset(auth, code, password);
  }

  function resendEmailVerification() {
    return resendVerification(auth.currentUser);
  }

  function resetPassword(email: string) {
    return sendPasswordResetEmail(auth, email);
  }

  const value = useMemo(
    () => ({
      changeVerificationEmail,
      emailLogin,
      logout,
      resendEmailVerification,
      updatePasswordWithReset,
      resetPassword,
      currentUser,
    }),
    [currentUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
