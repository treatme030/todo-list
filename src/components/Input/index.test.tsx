import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import 'jest-styled-components';
import { Input } from './index';

describe('<Input />', () => {
  it('renders component correctly', () => {
    const { container } = render(<Input value="default value" />);

    const input = screen.getByDisplayValue('default value');
    expect(input).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });
  it('renders placeholder correctly', () => {
    render(<Input placeholder="default placeholder" />);

    const input = screen.getByPlaceholderText('default placeholder');
    expect(input).toBeInTheDocument();
  });
  it('changes the data', () => {
    render(<Input placeholder="default placeholder" />);

    const input = screen.getByPlaceholderText('default placeholder') as HTMLInputElement;
    userEvent.type(input, 'study react');
    expect(input.value).toBe('study react');
  });
});