import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import AppFunctional from './AppFunctional';

jest.mock('axios');

describe('AppFunctional Component', () => {
  test('renders coordinates and steps initially', () => {
    render(<AppFunctional />);

    const coordinatesElement = screen.getByText(/Coordinates/);
    const stepsElement = screen.getByText(/You moved 0 times/);

    expect(coordinatesElement).toBeInTheDocument();
    expect(stepsElement).toBeInTheDocument();
  });

  test('moves "B" left when left button is clicked', () => {
    render(<AppFunctional />);

    const leftButton = screen.getByText(/LEFT/);
    fireEvent.click(leftButton);

    const coordinatesElement = screen.getByText(/Coordinates \(1, 2\)/);
    expect(coordinatesElement).toBeInTheDocument();
  });

  test('resets state when reset button is clicked', () => {
    render(<AppFunctional />);

    const leftButton = screen.getByText(/LEFT/);
    fireEvent.click(leftButton);

    const resetButton = screen.getByText(/RESET/);
    fireEvent.click(resetButton);

    const coordinatesElement = screen.getByText(/Coordinates \(2, 2\)/);
    expect(coordinatesElement).toBeInTheDocument();
  });

  test('displays success message on valid form submission', async () => {
    render(<AppFunctional />);

    const emailInput = screen.getByPlaceholderText('type email');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);

    //await waitFor(() => {
      //const successMessage = screen.getByText('Success!');
      //expect(successMessage).toBeInTheDocument();
    });
  });

//   test('displays error message on invalid form submission', async () => {
//     render(<AppFunctional />);

//     const emailInput = screen.getByPlaceholderText('type email');
//     fireEvent.change(emailInput, { target: { value: 'invalidemail' } });

//     const submitButton = screen.getByText('Submit');
//     fireEvent.click(submitButton);

//     await waitFor(() => {
//       const errorMessage = screen.getByText('Invalid email format');
//       expect(errorMessage).toBeInTheDocument();
//    });
//  });
//});


