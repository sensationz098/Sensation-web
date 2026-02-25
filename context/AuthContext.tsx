"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, googleProvider } from "../lib/firebase";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import axios from "axios";
// import { cookies } from "next/headers";

interface AuthContextType {
  user: User | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const login = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken();
      const response = await axios.post("/api/auth/session/log-in", {
        idToken,
      });

      if (response.data.success) {
        router.push("/onboarding");
      } else {
        console.log("LOGIN FAILED", response.data.message, response.data.error);
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const logout = async () => {
    const logout = await signOut(auth);
    const result = await axios.post("/api/auth/session/log-out");
    if (result.data.success) {
      router.push("/");
    } else {
      console.log("LOGOUT FAILED", result.data.message, result.data.error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
