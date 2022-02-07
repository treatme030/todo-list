import React from 'react';
import { Router } from "react-router-dom";
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import "@testing-library/jest-dom/extend-expect";
import 'jest-styled-components';
import App from './App';

describe('<App />', () => {
  it('renders component correctly', () => {
    const history = createMemoryHistory();
    history.push('/');

    const { container } = render(
      <Router history={history}>
        <App />
      </Router>
    );

    const header = screen.getByText('할 일 목록');
    expect(header).toBeInTheDocument();

    const toDoList = screen.getByTestId('toDoList');
    expect(toDoList).toBeInTheDocument();
    expect(toDoList.childElementCount).toBe(0);

    const label = screen.getByText('+');
    expect(label).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });
  it('goes to Add and go back to List page', () => {
    const history = createMemoryHistory();
    history.push('/');

    const { container } = render(
      <Router history={history}>
        <App />
      </Router>
    );

    const addButton = screen.getByText('+');
    userEvent.click(addButton);

    const header = screen.getByText('할 일 추가');
    expect(header).toBeInTheDocument();
    const goBack = screen.getByText('돌아가기');
    expect(goBack).toBeInTheDocument();
    const input = screen.getByPlaceholderText('할 일을 입력해 주세요');
    expect(input).toBeInTheDocument();
    const button = screen.getByText('추가');
    expect(button).toBeInTheDocument();

    expect(container).toMatchSnapshot();

    userEvent.click(goBack);
    expect(header.textContent).toBe('할 일 목록');

    const toDoList = screen.getByTestId('toDoList');
    expect(toDoList).toBeInTheDocument();
  });
  it('goes to Detail page and go back to List page', () => {
    const history = createMemoryHistory();
    history.push('/');
    localStorage.setItem('ToDoList', '["ToDo 1"]');

    const { container } = render(
      <Router history={history}>
        <App />
      </Router>
    );

    const toDoItem = screen.getByText('ToDo 1');
    expect(toDoItem).toBeInTheDocument();
    
    userEvent.click(toDoItem);
    const header = screen.getByText('할 일 상세');
    expect(header).toBeInTheDocument();
    const goBack = screen.getByText('돌아가기');
    expect(goBack).toBeInTheDocument();
    const toDo = screen.getByText('ToDo 1');
    expect(toDo).toBeInTheDocument();
    const button = screen.getByText('삭제');
    expect(button).toBeInTheDocument();

    expect(container).toMatchSnapshot();

    userEvent.click(goBack);
    expect(header.textContent).toBe('할 일 목록');

    const toDoList = screen.getByTestId('toDoList');
    expect(toDoList).toBeInTheDocument();
  });
  it('shows Not Found page', () => {
    const history = createMemoryHistory();
    history.push('/foo');

    const { container } = render(
      <Router history={history}>
        <App />
      </Router>
    );

    const header = screen.getByText('에러');
    expect(header).toBeInTheDocument();
    const goBack = screen.getByText('돌아가기');
    expect(goBack).toBeInTheDocument();
    const message = screen.getByText('Not Found');
    expect(message).toBeInTheDocument();

    expect(container).toMatchSnapshot();

    userEvent.click(goBack);
    expect(header.textContent).toBe('할 일 목록');

    const toDoList = screen.getByTestId('toDoList');
    expect(toDoList).toBeInTheDocument();
  });
  it('adds a new ToDo', () => {
    const history = createMemoryHistory();
    history.push('/');

    render(
      <Router history={history}>
        <App />
      </Router>
    );

    const addButton = screen.getByText('+');
    userEvent.click(addButton);

    const input = screen.getByPlaceholderText('할 일을 입력해 주세요');
    const button = screen.getByText('추가');
    userEvent.type(input, 'New ToDo');
    userEvent.click(button);

    const header = screen.getByText('할 일 목록');
    expect(header).toBeInTheDocument();
    const newToDo = screen.getByText('New ToDo');
    expect(newToDo).toBeInTheDocument();
  });
  it('deletes ToDo from ToDo List page', () => {
    const history = createMemoryHistory();
    history.push('/');
    localStorage.setItem('ToDoList', '["ToDo 1"]');

    render(
      <Router history={history}>
        <App />
      </Router>
    );

    const toDoItem = screen.getByText('ToDo 1');
    const deleteButton = screen.getByText('삭제');
    expect(toDoItem).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();

    userEvent.click(deleteButton);
    expect(toDoItem).not.toBeInTheDocument();
    expect(deleteButton).not.toBeInTheDocument();
    expect(localStorage.getItem('ToDoList')).toBe('[]');
  });
  it('deletes ToDo from the detail page', () => {
    const history = createMemoryHistory();
    history.push('/');
    localStorage.setItem('ToDoList', '["ToDo 1"]');

    render(
      <Router history={history}>
        <App />
      </Router>
    );

    const toDoItem = screen.getByText('ToDo 1');
    expect(toDoItem).toBeInTheDocument();

    userEvent.click(toDoItem);
    const header = screen.getByText('할 일 상세');
    expect(header).toBeInTheDocument();

    const deleteButton = screen.getByText('삭제');
    userEvent.click(deleteButton);
    expect(header.textContent).toBe('할 일 목록');
    const toDoList = screen.getByTestId('toDoList');
    expect(toDoList).toBeInTheDocument();
    expect(toDoList.childElementCount).toBe(0);
    expect(localStorage.getItem('ToDoList')).toBe('[]');
  });
});
