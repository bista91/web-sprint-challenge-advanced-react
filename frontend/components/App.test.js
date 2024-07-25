import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import AppFunctional from './AppFunctional';

jest.mock('axios');

describe('AppFunctional Component', () => {
  test('displays success message on valid form submission', async () => {
    axios.post.mockResolvedValue({ data: { message: 'Success!' } }); // Mock success response

    render(<AppFunctional />);

    const emailInput = screen.getByPlaceholderText('type email');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);

    await waitFor(() => {
      const successMessage = screen.getByText('Success!');
      expect(successMessage).toBeInTheDocument();
    });
  });

  test('displays error message on invalid form submission', async () => {
    axios.post.mockRejectedValue({ response: { data: { message: 'Invalid email format' } } }); // Mock error response

    render(<AppFunctional />);

    const emailInput = screen.getByPlaceholderText('type email');
    fireEvent.change(emailInput, { target: { value: 'invalidemail' } });

    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);

    await waitFor(() => {
      const errorMessage = screen.getByText('Invalid email format');
      expect(errorMessage).toBeInTheDocument();
    });
  });
});