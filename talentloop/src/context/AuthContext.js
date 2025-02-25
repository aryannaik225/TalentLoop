"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { auth, googleProvider } from "@/utils/firebaseConfig";
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, sendPasswordResetEmail } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/utils/firebaseConfig";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      try {
        if (currentUser) {
          const userDocRef = doc(db, "users", currentUser.uid);
          const userDoc = await getDoc(userDocRef);
  
          if (userDoc.exists()) {
            setUser({
              uid: currentUser.uid,
              email: currentUser.email,
              name: currentUser.displayName || userDoc.data().name,
              photoURL: currentUser.photoURL || userDoc.data().profilePicture || "/default-pfp.png",
            })
          } else {
            await setDoc(userDocRef, {
              name: currentUser.displayName || currentUser.email || "",
              email: currentUser.email,
              profilePicture: currentUser.photoURL || "/default-pfp.png",
            });
  
            setUser({
              uid: currentUser.uid,
              email: currentUser.email,
              name: currentUser.displayName || currentUser.email || "",
              photoURL: currentUser.photoURL || "/default-pfp.png",
            });
          }
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error in AuthContext useEffect: ", error);
      } finally{
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const signUp = async (email, password) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const newUser = userCredential.user;

    await setDoc(doc(db, "users", newUser.uid), {
      name: newUser.email || "",
      email: newUser.email,
      profilePicture: "/default-pfp.png",
    });

    return newUser;
  };

  const signIn = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleSignIn = async () => {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    const userDocRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      await setDoc(userDocRef, {
        name: user.displayName || user.email || "",
        email: user.email,
        profilePicture: user.photoURL || "/default-pfp.png",
      });
    }

    return user;
  };

  const logOut = async () => {
    return signOut(auth);
  };

  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      return "Password reset link sent to your email!";
    } catch (error) {
      return (error.message);
    }
  }

  return (
    <AuthContext.Provider value={{ user, signUp, signIn, googleSignIn, logOut, resetPassword }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
