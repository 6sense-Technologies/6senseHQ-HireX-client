import axios from 'axios';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { AuthGoogleID, AuthGoogleSecret } from './config';

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: 'jwt',
  },
  providers: [
    GoogleProvider({
      clientId: AuthGoogleID,
      clientSecret: AuthGoogleSecret,
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      console.log(profile);
      console.log(account);
      // const response = await axios.post(
      //   'http://localhost:8000/auth/social-login',
      //   {
      //     // Add your payload here
      //   },
      //   {
      //     // Add your config here
      //   }
      // );
      return true; // or return a string if needed
    },
  },
});
