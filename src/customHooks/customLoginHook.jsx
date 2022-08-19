import React from "react";
import { auth } from "../firebase.config";
import { useState } from "react";
import { GithubAuthProvider, signInWithPopup } from "firebase/auth";

const useLoginHook = () => {
  const [error, setError] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const provider = new GithubAuthProvider();
  const login = async () => {
    setError(null);
    setIsPending(true);
    try {
      const res = await signInWithPopup(auth, provider);
      if (!res) {
        throw new Error("Can`t complete signUp!");
      }
      const user = res.user;
      console.log(user);
      setIsPending(false);
    } catch (error) {
      setError(error.message);
      setIsPending(false);
    }
  };
  return { login, error, isPending };
};
export default useLoginHook;
