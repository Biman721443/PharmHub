import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAv0Q2lhxqdtESUQQhewfbAgshVYQ-WZzc",
  authDomain: "pharmhub-87fa3.firebaseapp.com",
  projectId: "pharmhub-87fa3",
  storageBucket: "pharmhub-87fa3.appspot.com",
  messagingSenderId: "1083938865784",
  appId: "1:1083938865784:web:47be463f9d04b023bb638d",
};

// ✅ Initialize Firebase (Important!)
const app = initializeApp(firebaseConfig);

// ✅ Get Authentication Instance
const auth = getAuth(app);
auth.useDeviceLanguage();

export { app, auth };
