import { render, screen } from '@testing-library/react';

import Footer from '.';

const mockSave = jest.fn();
const mockBudget = jest.fn();
const mockSubmit = jest.fn();

describe('<Footer />', () => {
  it('renders correctly', () => {
    render(<Footer
      onSubmit={mockSubmit}
      onBudget={mockBudget}
      onSave={mockSave}
      isLoading={false}
      hasStock
    />);

    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(3);
  });

  it('disables all three buttons when loading is true', () => {
    render(<Footer
      onSubmit={mockSubmit}
      onBudget={mockBudget}
      onSave={mockSave}
      isLoading
      hasStock
    />);

    const submitButton = screen.getByText(/cobrar/i);
    const saveButton = screen.getByText(/guardar/i);
    const budgetButton = screen.getByText(/presupuesto/i);

    expect(submitButton).toBeDisabled();
    expect(saveButton).toBeDisabled();
    expect(budgetButton).toBeDisabled();
  });

  it('disables submit button when stock is false', () => {
    render(<Footer
      onSubmit={mockSubmit}
      onBudget={mockBudget}
      onSave={mockSave}
      isLoading={false}
      hasStock={false}
    />);

    const submitButton = screen.getByText(/cobrar/i);
    expect(submitButton).toBeDisabled();
  });

  // TODO: Activate test when functionality is implemented

  //   it('save and budget buttons remains active when no stock is present', () => {
  //     render(<Footer
  //       onSubmit={mockSubmit}
  //       onBudget={mockBudget}
  //       onSave={mockSave}
  //       isLoading={false}
  //       hasStock={false}
  //     />);

  //     const saveButton = screen.getByText(/guardar/i);
  //     const budgetButton = screen.getByText(/presupuesto/i);

  //     expect(saveButton).not.toBeDisabled();
  //     expect(budgetButton).not.toBeDisabled();
  //   });
});
