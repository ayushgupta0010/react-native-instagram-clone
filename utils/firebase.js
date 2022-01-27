import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebase = initializeApp({
  apiKey: "AIzaSyB_W79gqcb-BpBBaW6sITOHHavnjGpLv_I",
  authDomain: "react-native-ig-clone-7af5a.firebaseapp.com",
  projectId: "react-native-ig-clone-7af5a",
  storageBucket: "react-native-ig-clone-7af5a.appspot.com",
  messagingSenderId: "31085729846",
  appId: "1:31085729846:web:39cc256eeb0000d9e4a097",
});

const auth = getAuth(firebase);
const db = getFirestore(firebase);

export { auth, db };
