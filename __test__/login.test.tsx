import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { store } from '../store/store';
import Login from '../app/(auth)/login/page';
import axios from 'axios';
import { useSession } from 'next-auth/react';


jest.mock('../components/loader', () => {
  return jest.fn(() => <div data-testid="mock-loader">Mock Loader</div>);
});


jest.mock('next-auth', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    handlers: jest.fn(),
    signIn: jest.fn(),
    signOut: jest.fn(),
  })),
}));

// Mock NextAuth and providers
jest.mock('next-auth/react', () => ({
  signIn: jest.fn(),
  useSession: jest.fn(),
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
    (useSession as jest.Mock).mockReturnValue({ status: 'unauthenticated', data: null });

    render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Login />
        </QueryClientProvider>
      </Provider>
    );
  });

  it('renders the mock loader when unauthenticated', async () => {
    const loader = await screen.findByTestId('mock-loader');
    expect(loader).toBeInTheDocument();
  });

  it('renders the title if authenticated', async () => {
    // Mock session to authenticated
    (useSession as jest.Mock).mockReturnValueOnce({
      status: 'authenticated',
      data: { user: { name: 'Test User' } },
    });

    render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Login />
        </QueryClientProvider>
      </Provider>
    );

    const title = await screen.findByRole('heading', { name: /Login/i });
    expect(title).toBeInTheDocument();
  });
});
