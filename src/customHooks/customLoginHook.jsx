import React, { useEffect } from "react";
import { auth } from "../firebase.config";
import { useState } from "react";
import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setLoginUserId } from "../redux/LoginSlice/login-actions";

const useLoginHook = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const provider = new GithubAuthProvider();
  useEffect(() => {
    dispatch(setLoginUserId(user?.providerData[0].uid));
  }, [user]);
  const login = async () => {
    setError(null);
    setIsPending(true);
    try {
      const res = await signInWithPopup(auth, provider);
      if (!res) {
        throw new Error("Can`t complete signUp!");
      }
      const user = res.user;
      setUser(user);
      setIsPending(false);
    } catch (error) {
      setError(error.message);
      setIsPending(false);
    }
  };
  return { login, error, isPending, userId };
};
export default useLoginHook;
