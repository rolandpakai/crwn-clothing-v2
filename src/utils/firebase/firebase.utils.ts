// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { Category } from '../../store/categories/category.types';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  signInWithRedirect, 
  signInWithPopup, 
  createUserWithEmailAndPassword, 
  GoogleAuthProvider, 
  signOut,
  onAuthStateChanged,
  User,
  UserCredential,
  NextOrObserver,
} from "firebase/auth";
import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc,
  getDocs,
  collection,
  writeBatch,
  query,
  QueryDocumentSnapshot,
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
initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => 
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => 
  signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export type ObjectToAdd = {
  title: string;
}

export const addCollectionAndDocuments = async <T extends ObjectToAdd>(
  collectionKey: string, 
  objectsToAdd: T[],
  ): Promise<void> => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
}

export const getCategoriesAndDocuments = async (): Promise<Category[]> => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);
  const querySnapshot = await getDocs(q);
  
  return querySnapshot.docs.map((docSnapshot) => {
    return docSnapshot.data() as Category
  });
}

export type OtherData = {
  displayName?: string;
}

export type UserData = {
  createdAt: Date;
  displayName: string;
  email: string;
}

export const createUserDocumentFromAuth = async (
  userAuth: User, 
  otherData = {} as OtherData,
  ): Promise<QueryDocumentSnapshot<UserData> | void> => {
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

  return userSnapshot as QueryDocumentSnapshot<UserData>;  
}

export const createAuthUserWithEmailAndPassword = async (
  email: string, 
  password: string,
):Promise<UserCredential> => { 
  return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInAuthUserWithEmailAndPassword = async (
  email: string, 
  password: string,
):Promise<UserCredential> =>{
  return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async ():Promise<void> => {
  return await signOut(auth);
}

export const onAuthStateChangedListener = (callback: NextOrObserver<User>) => { 
  return onAuthStateChanged(auth, callback)
}

export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth, 
      (userAuth) => {
        unsubscribe();
        resolve(userAuth);
      },
      reject);
  })
}