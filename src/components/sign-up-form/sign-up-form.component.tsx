import { useState, FormEvent, ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { AuthError, AuthErrorCodes } from 'firebase/auth'

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import { SignUpContainer, H2Container, SubTitle, Form } from './sign-up-form.styles';
import { signUpStart } from "../../store/user/user.action";

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

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => { 
    const {name, value} = event.target;
    setFormFields({ ...formFields, [name]: value })
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if(password !== confirmPassword) {
      return;
    }

    try {
      dispatch(signUpStart(email, password, displayName))
      resetFormFields();
    } catch(e) {
      let error = e as AuthError;
      switch (error.code) {
        case AuthErrorCodes.EMAIL_EXISTS: { alert(error.message); break;}
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
          label="Display Name" 
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