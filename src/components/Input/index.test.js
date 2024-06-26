import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { expect, describe, it } from '@jest/globals';
import '@testing-library/jest-dom';

import { Input } from './Input';

describe('Input component', () => {
  it('renders input element', () => {
    render(<Input />);

    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toBeInTheDocument();
  });

  it('renders label when provided', () => {
    render(<Input label="Username" />);

    const labelElement = screen.getByText('Username');
    expect(labelElement).toBeInTheDocument();
  });

  it('passes props to input element', () => {
    render(<Input placeholder="Enter your username" />);

    const inputElement = screen.getByPlaceholderText('Enter your username');
    expect(inputElement).toBeInTheDocument();
  });

  it('handles input change', () => {
    render(<Input />);
    const inputElement = screen.getByRole('textbox');

    fireEvent.change(inputElement, { target: { value: 'test' } });
    expect(inputElement).toHaveValue('test');
  });
});
