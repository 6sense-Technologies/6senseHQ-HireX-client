import { signInWithGoogle } from '@/app/actions/signInGoogle';
import { Button } from '@/components/ui/button';
import { GoogleLogo } from '@phosphor-icons/react';
import React, { MouseEvent } from 'react';

const GoogleButton = () => {
  const handleGoogleSignIn = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    await signInWithGoogle();
  };

  return (
    <div>
      <Button
        variant={'google'}
        size={'medium'}
        className='text-sm'
        onClick={handleGoogleSignIn}
      >
        <GoogleLogo size={32} />
        Continue with Google
      </Button>
    </div>
  );
};

export default GoogleButton;