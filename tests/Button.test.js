// tests/Button.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Button } from '../src';

test('renders button with correct label', () => {
  render(<Button label="Click Me" />);
  const buttonElement = screen.getByText(/Click Me/i);
  expect(buttonElement).toBeInTheDocument();
});

