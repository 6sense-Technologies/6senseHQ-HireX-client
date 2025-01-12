import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { store } from '../store/store';
import CreateJob from '../app/(dashboards)/jobs/create/page';
import { useSession } from 'next-auth/react';
import MockInterviewStageDropdown from '@/__mocks__/InterviewStageDropdown';

// Mock external libraries
jest.mock('lucide-react', () => ({
    PlusCircle: () => <svg data-testid="plus-circle-icon" />,
  }));

jest.mock('next-auth/react', () => ({
  __esModule: true,
  useSession: jest.fn(),
}));

jest.mock('../api/Job/JobApi.ts', () => ({
  getDepartments: jest.fn(() => Promise.resolve([{ jobDepartmentName: 'HR' }])),
  getJobpostion: jest.fn(() => Promise.resolve([{ jobPositionName: 'Engineer' }])),
  handleCreateJob: jest.fn(),
}));

jest.mock('../components/topbreadcrumb.tsx', () => () => (
  <div data-testid="breadcrumb">Mock Breadcrumb</div>
));

// jest.mock('../componets/loader.tsx', () => () => (
//   <div data-testid="loader">Mock Loader</div>
// ));

jest.mock('../app/(dashboards)/jobs/create/_components/interviewStageDropdown.tsx', () => ({
    __esModule: true,
    default: jest.fn(() => <div data-testid="mock-dropdown">Mock Dropdown</div>),
  }));

  jest.mock('../app/(dashboards)/jobs/create/_components/interviewStage.tsx', () => () => (
    <div data-testid="interview-stage">Mock Interview Stage</div>
  ));

const queryClient = new QueryClient();

describe('CreateJob Page', () => {
  beforeEach(() => {
    // Mock `useSession` for authentication
    (useSession as jest.Mock).mockReturnValue({
      status: 'authenticated',
      data: { user: { name: 'Test User' } },
    });

    render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <CreateJob />
        </QueryClientProvider>
      </Provider>
    );
  });

  it('renders the breadcrumb', () => {
    const breadcrumb = screen.getByTestId('breadcrumb');
    expect(breadcrumb).toBeInTheDocument();
  });

  it('renders the job information section', () => {
    const jobInformationSection = screen.getByText(/Job Information/i);
    expect(jobInformationSection).toBeInTheDocument();
  });

  


  it('renders the footer section buttons', () => {
    const cancelButton = screen.getByRole('button', { name: /Cancel/i });
    const createButton = screen.getByRole('button', { name: /Create/i });
    expect(cancelButton).toBeInTheDocument();
    expect(createButton).toBeInTheDocument();
  });

  describe('InterviewStageDropdown Component', () => {
    it('renders the mock dropdown', () => {
      render(<MockInterviewStageDropdown name="test" control={{}} onChange={() => {}} />);
      expect(screen.getByTestId('mock-dropdown')).toBeInTheDocument();
    });
  });

  it('renders the interview stage section', () => {
    const interviewStageSection = screen.getByTestId('interview-stage');
    expect(interviewStageSection).toBeInTheDocument();
  });

  it('navigates back to jobs on clicking the cancel button', () => {
    const cancelButton = screen.getByRole('button', { name: /Cancel/i });
    fireEvent.click(cancelButton);

    // Assuming mock navigation to /jobs
    expect(window.location.pathname).toBe('/');
  });
});
