import React from 'react';
import styled from 'styled-components';
import { Button } from 'components/Button';

const Container = styled.li`
  display: flex;
  border-bottom: 1px solid #bdbdbd;
  align-items: center;
  margin: 10px;
  padding: 10px;
`;

const Label = styled.div`
  flex: 1;
  font-size: 16px;
  margin-right: 20px;
`;

interface Props {
  readonly label: string;
  readonly onDelete: () => void;
}

export const ToDoItem = ({ label, onDelete }: Props) => {
  return (
    <Container>
      <Label>{label}</Label>
      <Button 
      label='삭제'
      backgroundColor='#ff1744'
      hoverColor='#f01440'
      onClick={onDelete}
      />
    </Container>
  )
}