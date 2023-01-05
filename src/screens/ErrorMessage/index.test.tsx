import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import ErrorMessage from '.';

const routes = [{
  path: '/',
  element: <h1>test?</h1>,
}, {
  path: '*',
  element: <ErrorMessage />,
}];

const router = createMemoryRouter(routes, { initialEntries: ['/', '/nope'], initialIndex: 1 });

describe('<ErrorMessage />', () => {
  it('renders correctly', () => {
    render(<RouterProvider router={router} />);

    const errorMessage = screen.getByText(/oh no!/i);
    expect(errorMessage).toBeInTheDocument();
  });

  it('redirects to home when clicked on button', () => {
    render(<RouterProvider router={router} />);

    const button = screen.getByRole('button');
    expect(button).toHaveTextContent(/volver a la página principal/i);

    fireEvent.click(button);

    expect(router.state.location.pathname).toBe('/');
  });
});
