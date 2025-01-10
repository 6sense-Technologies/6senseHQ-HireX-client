import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { store } from '../store/store';
import Login from '../app/(auth)/login/page';

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

  it('renders the subtitle', () => {
    const subtitle = screen.getByText('Continue with pattern50');
    expect(subtitle).toBeInTheDocument();
  });

  it('renders the email label', () => {
    const emailLabel = screen.getByText('Email Address');
    expect(emailLabel).toBeInTheDocument();
  });

  it('renders the email placeholder', () => {
    const emailPlaceholder = screen.getByPlaceholderText('Email Address');
    expect(emailPlaceholder).toBeInTheDocument();
  });

  it('renders the password placeholder', () => {
    const passwordPlaceholder = screen.getByPlaceholderText('Password');
    expect(passwordPlaceholder).toBeInTheDocument();
  });

  it('renders the login button', () => {
    const loginButton = screen.getByRole('button', { name: /login/i });
    expect(loginButton).toBeInTheDocument();
  });

  it('renders the Google button', () => {
    const googleButton = screen.getByText('Continue with Google');
    expect(googleButton).toBeInTheDocument();
  });

  it('renders the forgot password link', () => {
    const forgotPasswordLink = screen.getByText('Forgot password?');
    expect(forgotPasswordLink).toBeInTheDocument();
  });

  it('renders the text below the login button', () => {
    const orDivider = screen.getByText((content, element) => {
      return element.tagName.toLowerCase() === 'span' && content === 'or';
    });
    expect(orDivider).toBeInTheDocument();
  });

  it('renders the Google button on the left of the Google sign-in button', () => {
    const googleButton = screen.getByText('Continue with Google');
    expect(googleButton).toBeInTheDocument();
  });

  it('checks what happens when user hovers on the sign-in button', () => {
    const loginButton = screen.getByRole('button', { name: /login/i });
    fireEvent.mouseOver(loginButton);
    expect(loginButton).toHaveClass('hover:bg-blue-700');
  });
});
