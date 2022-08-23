import { signOut } from "firebase/auth";
import { auth } from "../firebase.config";

export const useLogout = () => {
  const logout = async () => {
    return signOut(auth);
  };

  return { logout };
};
