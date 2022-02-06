import React, { useContext } from 'react';
import styled from 'styled-components';
import { ToDoListContext } from 'contexts';
import { Button } from 'components';
import { useHistory, useParams } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  background-color: #fff;
  flex-direction: column;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0,2);
  position: relative;
  align-items: center;
`;

const ToDo = styled.div`
  min-width: 350px;
  height: 350px;
  overflow-y: auto;
  border: 1px solid #bdbdbd;
  margin-bottom: 20px;
  padding: 10px;
`;

export const Detail = () => {
  const { goBack } = useHistory();
  const params: { id: string } = useParams();
  const id = Number.parseInt(params.id);
  const { toDoList, deleteToDo } = useContext(ToDoListContext);
  const toDo = toDoList[id];

  return (
    <Container>
      <ToDo>{toDo}</ToDo>
      <Button 
      label="삭제"
      backgroundColor="#ff1744"
      hoverColor="#f01440"
      onClick={() => {
        deleteToDo(id);
        goBack();
      }}
      />
    </Container>
  )
}