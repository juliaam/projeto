import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { expect, describe, it, jest } from '@jest/globals';
import '@testing-library/jest-dom';

import { IconButton } from './IconButton';

describe('IconButton component', () => {
  it('renders button element', () => {
    render(<IconButton />);

    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeInTheDocument();
  });

  it('passes props to button element', () => {
    render(<IconButton aria-label="Close" />);

    const buttonElement = screen.getByLabelText('Close');
    expect(buttonElement).toBeInTheDocument();
  });

  it('handles button click', () => {
    const handleClick = jest.fn();

    render(<IconButton onClick={handleClick} />);

    const buttonElement = screen.getByRole('button');
    fireEvent.click(buttonElement);

    expect(handleClick).toHaveBeenCalled();
  });
});
