import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { store } from '../store/store';
import Login from '../app/(auth)/login/page';
import axios from 'axios';

// Mock NextAuth and providers
jest.mock('next-auth', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    handlers: jest.fn(),
    signIn: jest.fn(),
    signOut: jest.fn(),
  })),
}));

jest.mock('next-auth/providers/google', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    id: 'google',
    name: 'Google',
    type: 'oauth',
    clientId: 'mock-client-id',
    clientSecret: 'mock-client-secret',
  })),
}));

jest.mock('next-auth/providers/credentials', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    id: 'credentials',
    name: 'Credentials',
    credentials: {
      email: { label: 'Email', type: 'text', placeholder: 'example@example.com' },
      password: { label: 'Password', type: 'password' },
    },
    authorize: jest.fn(() => ({
      email: 'test@example.com',
      accessToken: 'mock-access-token',
      refreshToken: 'mock-refresh-token',
    })),
  })),
}));

jest.mock('axios', () => ({
  post: jest.fn(() => Promise.resolve({ data: { tokens: { access_token: 'mock-access-token', refresh_token: 'mock-refresh-token' } } })),
}));

const queryClient = new QueryClient();

describe('Login Page', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Login />
        </QueryClientProvider>
      </Provider>
    );
  });

  it('renders the logo', () => {
    const logo = screen.getByAltText('Pattern50 Logo');
    expect(logo).toBeInTheDocument();
  });

  it('renders the title', () => {
    const title = screen.getByRole('heading', { name: /login/i });
    expect(title).toBeInTheDocument();
  });

  it('calls signIn with Google provider on Google button click', async () => {
    const googleButton = screen.getByText('Continue with Google');
    fireEvent.click(googleButton);
    const { signIn } = require('next-auth');
    expect(signIn).toHaveBeenCalledWith('google');
  });

  it('calls signIn with credentials on login button click', async () => {
    const loginButton = screen.getByRole('button', { name: /login/i });
    fireEvent.click(loginButton);
    const { signIn } = require('next-auth');
    expect(signIn).toHaveBeenCalledWith('credentials', {
      redirect: false,
      email: '',
      password: '',
    });
  });

  it('handles axios mock call', async () => {
    const axiosMock = require('axios');
    await axiosMock.post('http://192.168.0.158:8000/auth/login', {
      email: 'test@example.com',
      password: 'password123',
    });
    expect(axiosMock.post).toHaveBeenCalledWith(
      'http://192.168.0.158:8000/auth/login',
      { email: 'test@example.com', password: 'password123' },
      { headers: { 'Content-Type': 'application/json' } }
    );
  });
});
