const axios = require('axios');

const signIn = jest.fn();
const signOut = jest.fn();
const useSession = jest.fn(() => ({
  status: 'unauthenticated',
  data: null,
}));

const GoogleProvider = jest.fn(() => ({
  id: 'google',
  name: 'Google',
  type: 'oauth',
  clientId: 'mock-client-id',
  clientSecret: 'mock-client-secret',
}));

const CredentialsProvider = jest.fn(() => ({
  id: 'credentials',
  name: 'Credentials',
  credentials: {
    email: { label: 'Email', type: 'text', placeholder: 'example@example.com' },
    password: { label: 'Password', type: 'password' },
  },
  authorize: jest.fn(async (credentials) => {
    const response = await axios.post(
      'http://192.168.0.158:8000/auth/login',
      {
        email: credentials?.email,
        password: credentials?.password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const data = response.data;
    if (data?.tokens?.access_token) {
      return {
        email: credentials.email,
        name: data?.userInfo?.name,
        accessToken: data.tokens.access_token,
        refreshToken: data.tokens.refresh_token,
      };
    }

    return null;
  }),
}));

module.exports = {
  signIn,
  signOut,
  useSession,
  GoogleProvider,
  CredentialsProvider,
};