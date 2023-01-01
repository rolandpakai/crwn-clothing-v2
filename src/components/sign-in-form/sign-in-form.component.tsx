import { useState, FormEvent, ChangeEvent, FC } from "react";
import { useDispatch } from "react-redux";
import { AuthError, AuthErrorCodes } from 'firebase/auth'

import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { SignUpContainer, ButtonContainer, H2Container, SubTitle, Form } from './sign-in-form.styles';
import { googleSignInStart, emailSignInStart } from "../../store/user/user.action"; 

const defaultFormFields = {
  email: "",
  password: "",
}

const SignInForm: FC<{}> = () => { 
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => { 
    setFormFields(defaultFormFields)
   }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => { 
    const {name, value} = event.target;
    setFormFields({ ...formFields, [name]: value })
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      dispatch(emailSignInStart(email, password));
      resetFormFields();
    } catch(e) {
      let error = e as AuthError;
      if(error) {
        switch (error.code) {
          case AuthErrorCodes.INVALID_PASSWORD: { alert(error.message); break;}
          case AuthErrorCodes.NULL_USER: { alert(error.message); break;}
          default: { console.error(error.message); }
        }
      }
    }
  }

  const signInWithGoogle = async () => {
    dispatch(googleSignInStart());
  }

  return (
    <SignUpContainer>
      <H2Container>I already have an account</H2Container>
      <SubTitle>Sign in with your emai and password</SubTitle>
      <Form onSubmit={handleSubmit}>

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

        <ButtonContainer>
          <Button 
            type="submit"
          >
            Sign In
          </Button>
          <Button 
            type="button"
            buttonType={BUTTON_TYPE_CLASSES.google}
            onClick={signInWithGoogle}
          >
              Google Sign In
          </Button>
        </ButtonContainer>
      </Form>
    </SignUpContainer>
  );
}

export default SignInForm;