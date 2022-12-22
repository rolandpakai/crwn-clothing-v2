import { auth, signInWithGooglePopup, signInWithGoogleRedirect, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import { getRedirectResult } from "firebase/auth";
import { useEffect } from 'react';


const SignIn = () => {

  /*useEffect( () => {
    const getRedirectResult = async () => {
      const response = await getRedirectResult(auth);
      if(response) {
        const userDocRef = await createUserDocumentFromAuth(response);
        console.log(userDocRef);
      }
    }
    getRedirectResult();
  }, []);*/

  const logGoogleUser = async () => {
    const {user} = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  }

  /*const logGoogleRedirectUser = async () => {
    await signInWithGoogleRedirect();
  }*/

  return (
    <div>
      <h1>Sign In</h1>
       <button onClick={logGoogleUser}>
        Sign in with Google Popup
       </button>
    </div>
  )
}

export default SignIn;