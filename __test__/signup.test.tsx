import '@testing-library/jest-dom';
import { render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { store } from '../store/store';
import Signup from '../app/(auth)/signup/page';

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

describe('Signup Page', () => {
  beforeEach(() => {
    const useSessionMock = jest.requireMock('next-auth/react').useSession;
    useSessionMock.mockReturnValue({ status: 'unauthenticated', data: null });

    render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Signup />
        </QueryClientProvider>
      </Provider>
    );
  });

  it('renders the logo', () => {
    const logo = screen.getByAltText('HireX Logo');
    expect(logo).toBeInTheDocument();
  });

  it('renders the title', () => {
    const title = screen.getByRole('heading', { name: /signup/i });
    expect(title).toBeInTheDocument();
  });

  it('renders the full name label', () => {
    const fullNameLabel = screen.getByText('Full Name');
    expect(fullNameLabel).toBeInTheDocument();
  });

  it('renders the email label', () => {
    const emailLabel = screen.getByText('Email Address');
    expect(emailLabel).toBeInTheDocument();
  });

  it('renders the password label', () => {
    const passwordLabel = screen.getByText('Password');
    expect(passwordLabel).toBeInTheDocument();
  });

  it('renders the full name placeholder', () => {
    const fullNamePlaceholder = screen.getByPlaceholderText('Full Name');
    expect(fullNamePlaceholder).toBeInTheDocument();
  });

  it('renders the email address placeholder', () => {
    const emailPlaceholder = screen.getByPlaceholderText('Email Address');
    expect(emailPlaceholder).toBeInTheDocument();
  });

  it('renders the password placeholder', () => {
    const passwordPlaceholder = screen.getByPlaceholderText('Password');
    expect(passwordPlaceholder).toBeInTheDocument();
  });
});
