import React from 'react';
import { Switch, Route } from 'react-router-dom';
import styled from 'styled-components';
import { ToDoListProvider } from 'contexts';
import { List, Add, Detail, NotFound } from 'pages';
import { PageHeader } from 'components';

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
        <PageHeader />
        <Switch>
          <Route exact path="/" component={List} />
          <Route exact path="/add" component={Add} />
          <Route exact path="/detail/:id" component={Detail} />
          <Route component={NotFound} />
        </Switch>
      </Container>
    </ToDoListProvider>
  );
}

export default App;
