// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAXxy8UWxV-AB46S3LNk2J0yUbmOJExfws",
  authDomain: "crwn-clothing-db-3a16d.firebaseapp.com",
  projectId: "crwn-clothing-db-3a16d",
  storageBucket: "crwn-clothing-db-3a16d.appspot.com",
  messagingSenderId: "110365868327",
  appId: "1:110365868327:web:da4ad50e24c25136806902"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);