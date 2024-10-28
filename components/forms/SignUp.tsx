// components/forms/SignUp.tsx
'use client';
import { ChangeEvent, useReducer } from 'react';
import { Card, Button, Typography, Checkbox } from '@material-tailwind/react';
import { useRouter } from 'next/navigation';

import FormInput from '@/components/forms/FormInput';
import { handleSignUp } from '@/utils/auth/handleSignUp';
import {
  initialState,
  signUpReducer,
} from '@/components/forms/reducers/signUpReducer';

export function SignUpForm() {
  const [state, dispatch] = useReducer(signUpReducer, initialState);
  const { email, password, name, emailError, passwordError } = state;
  const router = useRouter();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSignUp({
      email,
      password,
      name,
      setEmailError: (error: string) =>
        dispatch({ type: 'SET_EMAIL_ERROR', payload: error }),
      setPasswordError: (error: string) =>
        dispatch({ type: 'SET_PASSWORD_ERROR', payload: error }),
      router,
    });
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'SET_NAME', payload: e.target.value });
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'SET_EMAIL', payload: e.target.value });
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'SET_PASSWORD', payload: e.target.value });
  };

  return (
    <Card color='transparent' shadow={false}>
      <Typography variant='h4' color='blue-gray'>
        Sign Up
      </Typography>
      <Typography color='gray' className='mt-1 font-normal'>
        Nice to meet you! Enter your details to register.
      </Typography>
      <form
        className='mt-8 mb-2 w-80 max-w-screen-lg sm:w-96'
        onSubmit={onSubmit}
      >
        <div className='mb-1 flex flex-col gap-6'>
          <FormInput
            label='Your Name'
            type='text'
            value={name}
            onChange={handleNameChange}
          />
          <FormInput
            label='Email'
            type='email'
            value={email}
            onChange={handleEmailChange}
            error={emailError}
          />
          <FormInput
            label='Password'
            type='password'
            value={password}
            onChange={handlePasswordChange}
            error={passwordError}
          />
        </div>
        <Checkbox
          label={
            <Typography
              variant='small'
              color='gray'
              className='flex items-center font-normal'
            >
              I agree the
              <a
                href='#'
                className='font-medium transition-colors hover:text-gray-900'
              >
                &nbsp;Terms and Conditions
              </a>
            </Typography>
          }
          containerProps={{ className: '-ml-2.5' }}
        />
        <Button type='submit' color='gray' size='lg' className='mt-6' fullWidth>
          Sign Up
        </Button>
        <Typography color='gray' className='mt-4 text-center font-normal'>
          Already have an account?{' '}
          <a href='#' className='font-medium text-gray-900'>
            Sign In
          </a>
        </Typography>
      </form>
    </Card>
  );
}

export default SignUpForm;
