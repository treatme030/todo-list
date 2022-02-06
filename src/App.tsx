import React from 'react';
import { Switch, Route } from 'react-router-dom';
import styled from 'styled-components';
import { ToDoListProvider } from 'contexts';
import { List, Add, Detail } from 'pages';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

function App() {

  return (
    <ToDoListProvider>
      <Container>
        <Switch>
          <Route exact path="/" component={List} />
          <Route exact path="/add" component={Add} />
          <Route exact path="/detail/:id" component={Detail} />
        </Switch>
      </Container>
    </ToDoListProvider>
  );
}

export default App;
