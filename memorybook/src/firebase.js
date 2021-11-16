import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCKfMm1TJpcW4bhkgub_bg1fUVUHJ9cZ3k",
  authDomain: "react-memorybook.firebaseapp.com",
  projectId: "react-memorybook",
  storageBucket: "react-memorybook.appspot.com",
  messagingSenderId: "503934981765",
  appId: "1:503934981765:web:1801585bab2c194c7efbec",
  measurementId: "G-HFG0NEFBKB"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);