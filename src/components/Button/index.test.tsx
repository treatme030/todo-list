import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import "@testing-library/jest-dom/extend-expect";
import 'jest-styled-components';
import { Button } from './index';

describe('<Button />', () => {
  it('renders component correctly', () => {
    const { container } = render(<Button label="Button Test" />);

    const label = screen.getByText('Button Test');
    expect(label).toBeInTheDocument();

    const button = screen.getByRole('button');
    expect(button).toHaveStyleRule('background-color', '#304ffe');
    expect(button).toHaveStyleRule('background-color', '#1e40fe', {
      modifier: ':hover',
    });

    expect(container).toMatchSnapshot();
  });
  it('changes backgroundColor and hoverColor Props', () => {
    const backgroundColor = '#ff1744';
    const hoverColor = '#f01440';
    render(<Button label="Button Test" backgroundColor={backgroundColor} hoverColor={hoverColor} />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveStyleRule('background-color', backgroundColor);
    expect(button).toHaveStyleRule('background-color', hoverColor, {
      modifier: ':hover',
    });
  });
  it('clicks the button', () => {
    const handleClick = jest.fn();
    render(<Button label="Button Test" onClick={handleClick} />);

    const label = screen.getByText('Button Test');
    expect(handleClick).toHaveBeenCalledTimes(0);
    userEvent.click(label);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});