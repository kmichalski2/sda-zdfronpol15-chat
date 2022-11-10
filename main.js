import "./style.css";
import "./node_modules/bootstrap/dist/css/bootstrap.min.css";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { firebaseConfig } from "./config";
import { initChat } from "./chat";
import { initAuth } from "./auth/auth";

if (!firebaseConfig) {
  throw new Error("Dodaj swój config firebase do pliku config.js");
}

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

initChat(db);
initAuth(auth);
console.log("HEJ");
