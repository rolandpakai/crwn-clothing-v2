import { useState, useContext } from "react";
import { signInWithGooglePopup, signInAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils.js';
import FormInput from "../form-input/form-input.compoent.js";
import Button from "../button/button.component.js";
import { UserContext } from "../../contexts/user.context.js";
import './sign-in-form.styles.scss';

const defaultFormFields = {
  email: "",
  password: "",
}

const SignInForm = () => { 
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  const { setCurrentUser } = useContext(UserContext);

  const resetFormFields = () => { 
    setFormFields(defaultFormFields)
   }

  const handleChange = (event) => { 
    const {name, value} = event.target;
    setFormFields({ ...formFields, [name]: value })
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const {user} = await signInAuthUserWithEmailAndPassword(email, password);
      setCurrentUser(user);
      
      resetFormFields();
    } catch(error) {
      switch (error.code) {
        case "auth/wrong-password": { alert(error.message); break;}
        case 'auth/user-not-found': { alert(error.message); break;}
        default: { console.error(error.message); }
      }
    }
  }

  const signInWithGoogle = async () => {
    const {user} = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
  }

  return (
    <div className="sign-up-container">
      <h2>I already have an account</h2>
      <span>Sign in with your emai and password</span>
      <form onSubmit={handleSubmit}>

        <FormInput 
          required 
          label="Email" 
          type="email" 
          name="email" 
          autoComplete="email"
          onChange={handleChange} 
          value={email}/>

        <FormInput 
          required 
          label="Password" 
          type="password" 
          name="password" 
          autoComplete="password"
          onChange={handleChange} 
          value={password}/>

        <div className="buttons-container">
          <Button 
            type="submit"
          >
            Sign In
          </Button>
          <Button 
            type="button"
            buttonType={"google"}
            onClick={signInWithGoogle}
          >
              Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
}

export default SignInForm;