import React, { useState } from 'react';
import styled from 'styled-components';
import { InputContainer, ToDoList } from 'components';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Contents =styled.div`
  display: flex;
  background-color: #fff;
  flex-direction: column;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
`;

function App() {
  const [toDo, setToDo] = useState('');
  const [toDoList, setToDoList] = useState<string[]>([]);

  const addToDo = () => {
    if(toDo){
      setToDoList([
        ...toDoList,
        toDo
      ]);
      setToDo('');
    }
  }

  const deleteToDo = (index: number) => {
    setToDoList(prev => [
      ...prev.filter((item, idx) => idx !== index)
    ]);
  }

  return (
    <Container>
      <Contents>
        <ToDoList 
        toDoList={toDoList}
        deleteToDo={deleteToDo}
        />
        <InputContainer 
        toDo={toDo}
        onChange={(e) => setToDo(e.target.value)}
        onAdd={addToDo}
        />
      </Contents>
    </Container>
  );
}

export default App;
