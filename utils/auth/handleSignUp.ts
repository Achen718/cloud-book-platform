import bcrypt from 'bcryptjs';
import { validateEmail } from '@/utils/validation/emailValidation';
import { NextRouter } from 'next/router';

interface SignUpParams {
  email: string;
  password: string;
  name: string;
  setEmailError: (error: string) => void;
  setPasswordError: (error: string) => void;
  router: NextRouter;
}

export const handleSignUp = async ({
  email,
  password,
  name,
  setEmailError,
  setPasswordError,
  router,
}: SignUpParams) => {
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
