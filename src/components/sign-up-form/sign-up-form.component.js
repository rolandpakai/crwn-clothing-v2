import { useState } from "react";
import { useDispatch } from "react-redux";

import FormInput from "../form-input/form-input.component.js";
import Button from "../button/button.component.js";
import { SignUpContainer, H2Container, SubTitle, Form } from './sign-up-form.styles';
import { signUpStart } from "../../store/user/user.action.js";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
}

const SignUpForm = () => { 
  const dispatch = useDispatch();
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
      dispatch(signUpStart(email, password, displayName))
      
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
    <SignUpContainer>
      <H2Container>I do not have an account</H2Container>
      <SubTitle>Sign up with your emai and password</SubTitle>
      <Form onSubmit={handleSubmit}>
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
      </Form>
    </SignUpContainer>
  );
}

export default SignUpForm;