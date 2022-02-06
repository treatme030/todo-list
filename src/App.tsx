import React from 'react';
import { Switch, Route } from 'react-router-dom';
import styled from 'styled-components';
import { InputContainer, ToDoList } from 'components';
import { ToDoListProvider } from 'contexts';

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

  return (
    <ToDoListProvider>
      <Container>
        <Switch>
          <Route exact path="/">
            <Contents>
              <ToDoList />
              <InputContainer />
            </Contents>
          </Route>
        </Switch>
      </Container>
    </ToDoListProvider>
  );
}

export default App;
