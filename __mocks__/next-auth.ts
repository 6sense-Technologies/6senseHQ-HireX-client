import { jest } from '@jest/globals';
import { Session } from 'next-auth';
import {
  useSession as useSessionOriginal,
  signIn as signInOriginal,
  signOut as signOutOriginal,
} from 'next-auth/react';

jest.mock('next-auth/react', () => ({
  useSession: jest.fn(() => ({
    data: null as Session | null,
    status: 'unauthenticated' as
      | 'authenticated'
      | 'unauthenticated'
      | 'loading',
  })),
  signIn: jest.fn(),
  signOut: jest.fn(),
}));

// Ensure the types are correctly defined
export const useSession = useSessionOriginal as jest.Mock;
export const signIn = signInOriginal as jest.Mock;
export const signOut = signOutOriginal as jest.Mock;
