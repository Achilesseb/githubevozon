import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAlEjlVN_Py65TXHgnXkP16cjLhJFN8Taw",
  authDomain: "github-project-8c9bf.firebaseapp.com",
  projectId: "github-project-8c9bf",
  storageBucket: "github-project-8c9bf.appspot.com",
  messagingSenderId: "2430384780",
  appId: "1:2430384780:web:66841e8036c3da8d6c59a9",
};
const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth();
