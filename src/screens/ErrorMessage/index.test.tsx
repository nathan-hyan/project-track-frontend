import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

import ErrorMessage from '.';

describe('<ErrorMessage />', () => {
  it('renders correctly', () => {
    const routes = [{
      path: '/',
      element: <h1>test?</h1>,
    }, {
      path: '*',
      element: <ErrorMessage />,
    }];

    const router = createMemoryRouter(routes, { initialEntries: ['/', '/nope'], initialIndex: 1 });

    render(<RouterProvider router={router} />);

    const errorMessage = screen.getByText(/oh no!/i);
    expect(errorMessage).toBeInTheDocument();
  });
});
