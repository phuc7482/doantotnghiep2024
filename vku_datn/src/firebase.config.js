import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCHXoUy0Y3AcL5RLiBsDvM7Dn9H-VTgdtQ",
  authDomain: "vkudatn.firebaseapp.com",
  projectId: "vkudatn",
  storageBucket: "vkudatn.appspot.com",
  messagingSenderId: "396053027531",
  appId: "1:396053027531:web:f7ff9c48c1fa5fb045194e"
};

// // Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import {getAuth} from "firebase/auth";
// import {getFirestore} from "firebase/firestore";
// import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyACdtrCIT4EvIfDUtO0T7CLYShAkMO4ZCU",
//   authDomain: "vkuend.firebaseapp.com",
//   projectId: "vkuend",
//   storageBucket: "vkuend.appspot.com",
//   messagingSenderId: "220750306963",
//   appId: "1:220750306963:web:c0c57638bea15628bd3766",
//   measurementId: "G-09F04R09XK"
// };

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// export const auth = getAuth(app);
// export const db = getFirestore(app);
// export const storage = getStorage(app);

// export default app;