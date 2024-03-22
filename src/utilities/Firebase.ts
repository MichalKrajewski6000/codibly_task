import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBhM5gYQ0Eqs_QJpzIj3LE2y_fbc12WlhA",
  authDomain: "codibly-c4b69.firebaseapp.com",
  projectId: "codibly-c4b69",
  storageBucket: "codibly-c4b69.appspot.com",
  messagingSenderId: "511959839123",
  appId: "1:511959839123:web:632121047e99f777c87866",
  measurementId: "G-48CWQ0RJ5J",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
