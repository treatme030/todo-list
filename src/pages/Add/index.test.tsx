import React from "react";
import { Router, useLocation } from "react-router-dom";
import { createMemoryHistory } from 'history';
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import 'jest-styled-components';
import { ToDoListProvider } from "contexts";
import { Add } from "./index";

describe('<Add />', () => {
  it('renders component correctly', () => {
    const history = createMemoryHistory();
    history.push('/add');

    const { container } = render(
      <Router history={history}>
        <Add />
      </Router>
    );

    const input = screen.getByPlaceholderText('할 일을 입력해 주세요');
    expect(input).toBeInTheDocument();
    const addButton = screen.getByText('추가');
    expect(addButton).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });
  it('add a new ToDo and redirect to the root page', () => {
    const history = createMemoryHistory();
    history.push('/add');

    const TestComponent = () => {
      const { pathname } = useLocation();
      return (
        <ToDoListProvider>
          <div>{pathname}</div>
          <Add />
        </ToDoListProvider>
      );
    };

    render(
      <Router history={history}>
        <TestComponent />
      </Router>
    );

    const pathName = screen.getByText('/add');
    expect(pathName).toBeInTheDocument();

    const input = screen.getByPlaceholderText('할 일을 입력해 주세요');
    const addButton = screen.getByText('추가');
    userEvent.type(input, 'New ToDo');
    userEvent.click(addButton);
    expect(pathName.textContent).toBe('/');
    expect(JSON.parse(localStorage.getItem('ToDoList') as string)).toContain('New ToDo');
  });
});