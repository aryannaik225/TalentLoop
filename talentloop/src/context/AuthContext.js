"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { auth, googleProvider } from "@/utils/firebaseConfig";
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signUp = async (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleSignIn = async () => {
    return signInWithPopup(auth, googleProvider);
  };

  const logOut = async () => {
    return signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, signUp, signIn, googleSignIn, logOut }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
