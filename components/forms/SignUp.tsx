'use client';
import { useState } from 'react';
import { Card, Input, Button, Typography } from '@material-tailwind/react';
import bcrypt from 'bcryptjs';
import { useRouter } from 'next/navigation';

export function SignUpForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const router = useRouter();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    let valid = true;

    if (!validateEmail(email)) {
      setEmailError('Invalid email address');
      valid = false;
    } else {
      setEmailError('');
    }

    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (valid) {
      const hashedPassword = bcrypt.hashSync(password, 10);
      await fetch('http://localhost:3001/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password: hashedPassword,
          name,
          role: 'Author',
        }),
      });
      router.push('/login');
    }
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
        onSubmit={handleSignUp}
      >
        <div className='mb-1 flex flex-col gap-6'>
          <Typography variant='h6' color='blue-gray' className='-mb-3'>
            Your Name
          </Typography>
          <Input
            size='lg'
            placeholder='Your Name'
            className=' !border-t-blue-gray-200 focus:!border-t-gray-900'
            labelProps={{
              className: 'before:content-none after:content-none',
            }}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Typography variant='h6' color='blue-gray' className='-mb-3'>
            Email
          </Typography>
          <Input
            size='lg'
            placeholder='name@mail.com'
            className=' !border-t-blue-gray-200 focus:!border-t-gray-900'
            labelProps={{
              className: 'before:content-none after:content-none',
            }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {emailError && (
            <Typography variant='small' color='red' className='mt-1'>
              {emailError}
            </Typography>
          )}
          <Typography variant='h6' color='blue-gray' className='-mb-3'>
            Password
          </Typography>
          <Input
            size='lg'
            type='password'
            placeholder='Password'
            className=' !border-t-blue-gray-200 focus:!border-t-gray-900'
            labelProps={{
              className: 'before:content-none after:content-none',
            }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {passwordError && (
            <Typography variant='small' color='red' className='mt-1'>
              {passwordError}
            </Typography>
          )}
        </div>
        <Button type='submit' className='mt-6' fullWidth>
          Sign Up
        </Button>
      </form>
    </Card>
  );
}
