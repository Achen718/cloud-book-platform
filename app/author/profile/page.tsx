'use client';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useRole } from '@/context/roleContext';
import { Button, Input, Typography } from '@material-tailwind/react';

const UserProfile = () => {
  const { data: session } = useSession();
  const { role, grantAccess, revokeAccess } = useRole();
  const [userId, setUserId] = useState('');

  const handleGrantAccess = () => {
    grantAccess(userId, 'Collaborator');
    setUserId('');
  };

  const handleRevokeAccess = () => {
    revokeAccess(userId);
    setUserId('');
  };

  return (
    <div>
      <Typography variant='h4'>User Profile</Typography>
      <Typography variant='h6'>Current User: {session?.user?.name}</Typography>
      <Typography variant='h6'>Role: {role}</Typography>

      <div className='mt-4'>
        <Input
          type='text'
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder='Enter User ID'
          className='mb-2'
        />
        <Button onClick={handleGrantAccess} className='mr-2'>
          Grant Collaborator Access
        </Button>
        <Button onClick={handleRevokeAccess} color='red'>
          Revoke Access
        </Button>
      </div>
    </div>
  );
};

export default UserProfile;
