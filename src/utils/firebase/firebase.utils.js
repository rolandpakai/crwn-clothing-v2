// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  signInWithRedirect, 
  signInWithPopup, 
  createUserWithEmailAndPassword, 
  GoogleAuthProvider, 
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail 
} from "firebase/auth";
import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc 
} from "firebase/firestore";

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

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, otherData) => {
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if(!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...otherData
      });
    } catch(error) {
      console.error(error);
    }
  }

  return userDocRef;  
}

export const createAuthUserWithEmailAndPassword = async (email, password) => { 
  if(!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInAuthUserWithEmailAndPassword = async (email, password) =>{
  if(!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => {
  return await signOut(auth);
}

export const onAuthStateChangedListener = (callback) => { 
  return onAuthStateChanged(auth, callback)
}