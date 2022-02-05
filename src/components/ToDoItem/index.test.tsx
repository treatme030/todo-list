import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import "@testing-library/jest-dom/extend-expect";
import 'jest-styled-components';
import { ToDoItem } from './index';

describe('<ToDoItem />', () => {
  it('renders component correctly', () => {
    const { container } = render(<ToDoItem label="default value" />);

    const toDoItem = screen.getByText('default value');
    expect(toDoItem).toBeInTheDocument();

    const deleteButton = screen.getByText('삭제');
    expect(deleteButton).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });
  it('clicks the delete button', () => {
    const handleClick = jest.fn();
    render(<ToDoItem label="default value" onDelete={handleClick} />);

    const deleteButton = screen.getByText('삭제');
    expect(handleClick).toHaveBeenCalledTimes(0);
    userEvent.click(deleteButton);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
