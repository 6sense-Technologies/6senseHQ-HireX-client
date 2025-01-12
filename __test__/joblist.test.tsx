import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import JobList from '../app/(dashboards)/jobs/page';
import { useSession } from 'next-auth/react';

// Mock dependencies
jest.mock('next-auth/react', () => ({
  __esModule: true,
  useSession: jest.fn(),
}));

jest.mock('../api/Job/JobApi.ts', () => ({
  getJobList: jest.fn(() => Promise.resolve({
    jobs: [
      { jobPosition: 'Software Engineer', numberOfVacancies: 3, createdBy: 'Admin', createdAt: '2025-01-01' },
      { jobPosition: 'Data Scientist', numberOfVacancies: 2, createdBy: 'HR', createdAt: '2025-01-02' },
    ],
    meta: { totalPages: 2, totalCount: 5 },
  })),
}));

jest.mock('../components/topbreadcrumb.tsx', () => () => (
  <div data-testid="breadcrumb">Mock Breadcrumb</div>
));

jest.mock('../components/Pagination', () => () => (
  <div data-testid="pagination">Mock Pagination</div>
));

const queryClient = new QueryClient();

describe('JobList Component', () => {
  beforeEach(() => {
    // Mock session
    (useSession as jest.Mock).mockReturnValue({
      status: 'authenticated',
      data: { user: { name: 'Test User' } },
    });

    render(
      <QueryClientProvider client={queryClient}>
        <JobList />
      </QueryClientProvider>
    );
  });

  it('renders the title', () => {
    const title = screen.getByText(/Job List/i);
    expect(title).toBeInTheDocument();
  });

  it('renders the subtitle breadcrumb', () => {
    const breadcrumb = screen.getByTestId('breadcrumb');
    expect(breadcrumb).toBeInTheDocument();
  });

  it('renders the correct column names', () => {
    expect(screen.getByText(/POSITION/i)).toBeInTheDocument();
    expect(screen.getByText(/NO OF VACANCY/i)).toBeInTheDocument();
    expect(screen.getByText(/CREATED BY/i)).toBeInTheDocument();
    expect(screen.getByText(/CREATED AT/i)).toBeInTheDocument();
    expect(screen.getByText(/ACTION/i)).toBeInTheDocument();
  });

  it('displays job list data', async () => {
    const jobPosition = await screen.findByText(/Software Engineer/i);
    const numberOfVacancies = await screen.findByText('3');
    const createdBy = await screen.findByText('Admin');
    const createdAt = await screen.findByText('2025-01-01');

    expect(jobPosition).toBeInTheDocument();
    expect(numberOfVacancies).toBeInTheDocument();
    expect(createdBy).toBeInTheDocument();
    expect(createdAt).toBeInTheDocument();
  });

  it('renders the Details button in the Action column', () => {
    const detailsButtons = screen.getAllByRole('button', { name: /Details/i });
    expect(detailsButtons.length).toBeGreaterThan(0);
  });

  it('renders the pagination component', () => {
    const pagination = screen.getByTestId('pagination');
    expect(pagination).toBeInTheDocument();
  });
});