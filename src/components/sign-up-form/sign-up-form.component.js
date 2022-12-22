import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils.js';
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
      resetFormFields();
    } catch(error) {
      if (error.code === 'auth/email-already-in-user') {
        alert('Email already in use!');
      }
      console.log({error});
      switch (error.code) {
        case "auth/email-already-in-user": { alert(error.message); break;}
        case 'auth/weak-password': { alert(error.message); break;}
        default: { alert(error.message); }
      }
      console.log(error);
    }
  }

  return (
    <div className="sign-up-container">
      <h2>I do not have an account</h2>
      <span>Sign up with your emai and password</span>
      <form onSubmit={handleSubmit}>
        <label>Disply Name</label>
        <input required type="text" name="displayName" onChange={handleChange} value={displayName}/>

        <label>Email</label>
        <input required type="email" name="email" onChange={handleChange} value={email}/>

        <label>Password</label>
        <input required type="password" name="password" onChange={handleChange} value={password}/>

        <label>Confirm Password</label>
        <input required type="password" name="confirmPassword" onChange={handleChange} value={confirmPassword}/>

        <button type="submit">Sing Up</button>
      </form>
    </div>
  );
}

export default SignUpForm;