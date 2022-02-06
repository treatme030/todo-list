import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import "@testing-library/jest-dom/extend-expect";
import 'jest-styled-components';
import { InputContainer } from './index';
import { ToDoListProvider } from 'contexts';

describe('<InputContainer />', () => {
  it('renders component correctly', () => {
    const { container } = render(<InputContainer />);

    const input = screen.getByPlaceholderText('할 일을 입력해 주세요');
    expect(input).toBeInTheDocument();
    const addButton = screen.getByText('추가');
    expect(addButton).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });
  it('empties data after adding data', () => {
    render(<InputContainer />);

    const input = screen.getByPlaceholderText('할 일을 입력해 주세요') as HTMLInputElement;
    const addButton = screen.getByText('추가');
    expect(input.value).toBe('');

    userEvent.type(input, 'study react 1');
    expect(input.value).toBe('study react 1');
    userEvent.click(addButton);
    expect(input.value).toBe('');
  });
  it('adds input data to localStorage via Context', () => {
    render(
      <ToDoListProvider>
        <InputContainer />
      </ToDoListProvider>
    );

    const input = screen.getByPlaceholderText('할 일을 입력해 주세요');
    const addButton = screen.getByText('추가');
    expect(localStorage.getItem('ToDoList')).toBeNull();

    userEvent.type(input, 'study react 1');
    userEvent.click(addButton);
    expect(localStorage.getItem('ToDoList')).toBe('["study react 1"]');
  });
  it('calls the onAdd function when the user clicks Add button', () => {
    const handleClick = jest.fn();
    render(<InputContainer onAdd={handleClick} />);

    const input = screen.getByPlaceholderText('할 일을 입력해 주세요');
    const addButton = screen.getByText('추가');
    expect(handleClick).toHaveBeenCalledTimes(0);

    userEvent.click(addButton);
    expect(handleClick).toHaveBeenCalledTimes(0);

    userEvent.type(input, 'study react 1');
    userEvent.click(addButton);
    expect(handleClick).toHaveBeenCalledTimes(1);
  })
});

