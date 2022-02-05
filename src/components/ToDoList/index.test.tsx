import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import "@testing-library/jest-dom/extend-expect";
import 'jest-styled-components';
import { ToDoList } from './index';
import { ToDoListProvider } from 'contexts';

describe('<ToDoList />', () => {
  it('renders component correctly', () => {
    const { container } = render(
      <ToDoListProvider>
        <ToDoList />
      </ToDoListProvider>
    );

    const toDoList = screen.getByTestId('toDoList');
    expect(toDoList).toBeInTheDocument();
    expect(toDoList.childElementCount).toBe(0);

    expect(container).toMatchSnapshot();
  });
  it('shows toDo list', () => {
    localStorage.setItem('ToDoList', '["ToDo 1", "ToDo 2", "ToDo 3"]');

    render(
      <ToDoListProvider>
        <ToDoList />
      </ToDoListProvider>
    );

    expect(screen.getByText('ToDo 1')).toBeInTheDocument();
    expect(screen.getByText('ToDo 2')).toBeInTheDocument();
    expect(screen.getByText('ToDo 3')).toBeInTheDocument();
    expect(screen.getAllByText('삭제').length).toBe(3);
  });
  it('deletes toDo item', () => {
    localStorage.setItem('ToDoList', '["ToDo 1", "ToDo 2", "ToDo 3"]');

    render(
      <ToDoListProvider>
        <ToDoList />
      </ToDoListProvider>
    );

    const toDoItem = screen.getByText('ToDo 2');
    expect(toDoItem).toBeInTheDocument();
    const deleteButtons = screen.getAllByText('삭제');
    userEvent.click(deleteButtons[1]);
    expect(toDoItem).not.toBeInTheDocument();
    expect(JSON.parse(localStorage.getItem('ToDoList') as string)).not.toContain('ToDo 2');
  });
});

