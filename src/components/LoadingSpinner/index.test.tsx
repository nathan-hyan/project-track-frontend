import { render, screen } from '@testing-library/react';

import LoadingSpinner from '.';

describe('<LoadingSpinner />', () => {
  it('Renders on display', () => {
    render(<LoadingSpinner />);

    const spinner = screen.getByRole('progressbar');

    expect(spinner).toBeInTheDocument();
  });
});
