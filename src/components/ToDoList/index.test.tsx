import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import "@testing-library/jest-dom/extend-expect";
import 'jest-styled-components';
import { ToDoList } from './index';
import { ToDoListProvider } from 'contexts';

describe('<ToDoList />', () => {
  it('renders component correctly', () => {
    const { container } = render(
      <Router>
        <ToDoListProvider>
          <ToDoList />
        </ToDoListProvider>
      </Router>
    );

    const toDoList = screen.getByTestId('toDoList');
    expect(toDoList).toBeInTheDocument();
    expect(toDoList.childElementCount).toBe(0);

    expect(container).toMatchSnapshot();
  });
  it('shows toDo list', () => {
    localStorage.setItem('ToDoList', '["ToDo 1", "ToDo 2", "ToDo 3"]');

    render(
      <Router>
        <ToDoListProvider>
          <ToDoList />
        </ToDoListProvider>
      </Router>
    );
    
    const toDoItem1 = screen.getByText('ToDo 1');
    expect(toDoItem1).toBeInTheDocument();
    expect(toDoItem1.getAttribute('href')).toBe('/detail/0');

    const toDoItem2 = screen.getByText('ToDo 2');
    expect(toDoItem2).toBeInTheDocument();
    expect(toDoItem2.getAttribute('href')).toBe('/detail/1');

    const toDoItem3 = screen.getByText('ToDo 3');
    expect(toDoItem3).toBeInTheDocument();
    expect(toDoItem3.getAttribute('href')).toBe('/detail/2');

    expect(screen.getAllByText('삭제').length).toBe(3);
  });
  it('deletes toDo item', () => {
    localStorage.setItem('ToDoList', '["ToDo 1", "ToDo 2", "ToDo 3"]');

    render(
      <Router>
        <ToDoListProvider>
          <ToDoList />
        </ToDoListProvider>
      </Router>
    );

    const toDoItem = screen.getByText('ToDo 2');
    expect(toDoItem).toBeInTheDocument();
    const deleteButtons = screen.getAllByText('삭제');
    userEvent.click(deleteButtons[1]);
    expect(toDoItem).not.toBeInTheDocument();
    expect(JSON.parse(localStorage.getItem('ToDoList') as string)).not.toContain('ToDo 2');
  });
  it('moves to detail page', () => {
    const TestComponent = (): JSX.Element => {
      const { pathname } = useLocation();
      return (
        <div>
          <div>{pathname}</div>
        </div>
      );
    };

    localStorage.setItem('ToDoList', '["ToDo 1", "ToDo 2", "ToDo 3"]');

    render(
      <Router>
        <TestComponent />
        <ToDoListProvider>
          <ToDoList />
        </ToDoListProvider>
      </Router>
    );

    const url = screen.getByText('/');
    expect(url).toBeInTheDocument();

    const toDoItem2 = screen.getByText('ToDo 2');
    expect(toDoItem2.getAttribute('href')).toBe('/detail/1');
    userEvent.click(toDoItem2);
    expect(url.textContent).toBe('/detail/1');
  });
});

