'use client';
import { useState } from 'react';
import { Typography, Input, Button } from '@material-tailwind/react';
import { signIn } from 'next-auth/react';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    await signIn('credentials', {
      email,
      password,
      redirectTo: '/author/books',
    });
  };

  return (
    <section className='grid text-center h-screen items-center p-8'>
      <div>
        <Typography variant='h3' color='blue-gray' className='mb-2'>
          Sign In
        </Typography>
        <Typography className='mb-16 text-gray-600 font-normal text-[18px]'>
          Enter your email and password to sign in
        </Typography>
        <form
          action='#'
          className='mx-auto max-w-[24rem] text-left'
          onSubmit={handleLogin}
        >
          <div className='mb-6'>
            <label htmlFor='email'>
              <Typography
                variant='small'
                className='mb-2 block font-medium text-gray-900'
              >
                Your Email
              </Typography>
            </label>
            <Input
              onChange={(e) => setEmail(e.target.value)}
              id='email'
              color='gray'
              size='lg'
              type='email'
              name='email'
              value={email}
              placeholder='name@mail.com'
              className='w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200'
              labelProps={{
                className: 'hidden',
              }}
              {...{ required: true }}
            />
          </div>
          <div className='mb-6'>
            <label htmlFor='password'>
              <Typography
                variant='small'
                className='mb-2 block font-medium text-gray-900'
              >
                Password
              </Typography>
            </label>
            <Input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              size='lg'
              placeholder='********'
              labelProps={{
                className: 'hidden',
              }}
              className='w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200'
            />
          </div>
          <Button
            type='submit'
            color='gray'
            size='lg'
            className='mt-6'
            fullWidth
          >
            sign in
          </Button>
          <div className='!mt-4 flex justify-end'>
            <Typography
              as='a'
              href='#'
              color='blue-gray'
              variant='small'
              className='font-medium'
            >
              Forgot password
            </Typography>
          </div>
          <Button
            variant='outlined'
            size='lg'
            className='mt-6 flex h-12 items-center justify-center gap-2'
            fullWidth
          >
            <img
              src={`https://www.material-tailwind.com/logos/logo-google.png`}
              alt='google'
              className='h-6 w-6'
            />
            sign in with google
          </Button>
          <Typography
            variant='small'
            color='gray'
            className='!mt-4 text-center font-normal'
          >
            Not registered?{' '}
            <a href='#' className='font-medium text-gray-900'>
              Create account
            </a>
          </Typography>
        </form>
      </div>
    </section>
  );
}

export default LoginForm;
