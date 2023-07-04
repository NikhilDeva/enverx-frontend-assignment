// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { browserLocalPersistence, getAuth, setPersistence } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// TODO: Move creds to env variables
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC0KhtG-uU6u-VqfglrZmDc3570dCw12TY",
  authDomain: "enverx-37b95.firebaseapp.com",
  projectId: "enverx-37b95",
  storageBucket: "enverx-37b95.appspot.com",
  messagingSenderId: "365587717107",
  appId: "1:365587717107:web:d971e8b5d533ef058d1086"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
// (async () => {
//   await setPersistence(auth, browserLocalPersistence);
// })();
export default app;
