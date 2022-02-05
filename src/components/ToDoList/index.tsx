import React from 'react';
import styled from 'styled-components';
import { ToDoItem } from 'components/ToDoItem';

const Container = styled.ul`
  min-width: 350px;
  height: 400px;
  overflow-y: scroll;
  border: 1px solid #bdbdbd;
  margin-bottom: 20px;
`;

interface Props {
  readonly toDoList: string[];
  readonly deleteToDo: (index: number) => void;
}

export const ToDoList = ({ toDoList, deleteToDo }: Props) => {
  return (
    <Container data-testid="toDoList">
      {toDoList.map((item, index) => (
        <ToDoItem 
        key={item}
        label={item}
        onDelete={() => deleteToDo(index)}
        />
      ))}
    </Container>
  )
}