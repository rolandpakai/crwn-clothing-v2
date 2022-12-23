import { useState, useContext } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils.js';
import FormInput from "../form-input/form-input.compoent.js";
import Button from "../button/button.component.js";
import { UserContext } from '../../contexts/user.context';
import './sign-up-form.styles.scss';

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
}

const SignUpForm = () => { 
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;
  const { setCurrentUser } = useContext(UserContext)
  
  const resetFormFields = () => { 
    setFormFields(defaultFormFields)
   }

  const handleChange = (event) => { 
    const {name, value} = event.target;
    setFormFields({ ...formFields, [name]: value })
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if(password !== confirmPassword) {
      return;
    }

    try {
      const {user} = await createAuthUserWithEmailAndPassword(email, password);
      await createUserDocumentFromAuth(user, { displayName })
      setCurrentUser(user);
      
      resetFormFields();
    } catch(error) {
      switch (error.code) {
        case "auth/email-already-in-user": { alert(error.message); break;}
        case 'auth/weak-password': { alert(error.message); break;}
        default: { console.error(error.message); }
      }
    }
  }

  return (
    <div className="sign-up-container">
      <h2>I do not have an account</h2>
      <span>Sign up with your emai and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput 
          required 
          label="Disply Name" 
          type="text" 
          name="displayName" 
          onChange={handleChange} 
          value={displayName}/>

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

        <FormInput 
          required 
          label="Confirm Password" 
          type="password" 
          name="confirmPassword" 
          autoComplete="confirmPassword"
          onChange={handleChange} 
          value={confirmPassword}/>

        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
}

export default SignUpForm;