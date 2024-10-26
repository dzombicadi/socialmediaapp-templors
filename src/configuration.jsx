// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC7vd6duaD0sjsqm1sWDNs2w0-uvCd2FsE",
  authDomain: "uninet-hackathon.firebaseapp.com",
  projectId: "uninet-hackathon",
  storageBucket: "uninet-hackathon.appspot.com",
  messagingSenderId: "889378598770",
  appId: "1:889378598770:web:083d49458db4dc33e277eb",
  measurementId: "G-B7VVD92XXJ",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAnalytics = getAnalytics(firebaseApp);
const firebaseFirestore = getFirestore(firebaseApp);
const firebaseAuth = getAuth(firebaseApp);
const firebaseStorage = getStorage(firebaseApp);

export {
  firebaseApp,
  firebaseAnalytics,
  firebaseFirestore,
  firebaseAuth,
  firebaseStorage,
};
