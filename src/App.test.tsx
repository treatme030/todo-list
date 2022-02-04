import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import 'jest-styled-components';
import App from './App';

describe('<App />', () => {
  it('renders component correctly', () => {
    const { container } = render(<App />);

    const toDoList = screen.getByTestId('toDoList');
    expect(toDoList).toBeInTheDocument();
    expect(toDoList.childElementCount).toBe(0);

    const input = screen.getByPlaceholderText('할 일을 입력해 주세요');
    expect(input).toBeInTheDocument();

    const label = screen.getByText('추가');
    expect(label).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });
  it('adds and deletes ToDo items', () => {
    render(<App />);

    const input = screen.getByPlaceholderText('할 일을 입력해 주세요');
    const addBbutton = screen.getByText('추가');
    userEvent.type(input, 'study react');
    userEvent.click(addBbutton);

    const toDoItem = screen.getByText('study react');
    expect(toDoItem).toBeInTheDocument();
    const deleteButton = screen.getByText('삭제');
    expect(deleteButton).toBeInTheDocument();

    const toDoList = screen.getByTestId('toDoList');
    expect(toDoList.childElementCount).toBe(1);

    userEvent.type(input, 'study react 2');
    userEvent.click(addBbutton);

    const toDoItem2 = screen.getByText('study react 2');
    expect(toDoItem2).toBeInTheDocument();
    expect(toDoList.childElementCount).toBe(2);

    const deleteButtons = screen.getAllByText('삭제');
    userEvent.click(deleteButtons[0]);
    expect(toDoItem).not.toBeInTheDocument();
    expect(toDoList.childElementCount).toBe(1);
  });
});
