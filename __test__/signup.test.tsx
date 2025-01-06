import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { store } from '../store/store';
import Signup from '../app/(auth)/signup/page';

const queryClient = new QueryClient();

describe('Signup Page', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Signup />
        </QueryClientProvider>
      </Provider>
    );
  });

  it('renders the logo', () => {
    const logo = screen.getByAltText('Pattern50 Logo');
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
