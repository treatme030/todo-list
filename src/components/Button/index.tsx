import React from 'react';
import styled from 'styled-components';

interface ContainerProps {
  readonly backgroundColor: string;
  readonly hoverColor: string;
}

const Container = styled.button<ContainerProps>`
  text-align: center;
  background-color: ${(props) => props.backgroundColor};
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.hoverColor};
  }
  &:active {
    box-shadow: inset 5px 5px 10px rgba(0, 0, 0, 0.2);
  }
`;

const Label = styled.label`
  color: #fff;
  font-size: 16px;
`;

interface Props {
  readonly label: string;
  readonly backgroundColor?: string;
  readonly hoverColor?: string;
  readonly onClick?: () => void;
}

export const Button = ({ 
  label, backgroundColor='#304ffe', hoverColor='#1e40fe', onClick
}: Props) => {
  return (
    <Container 
    backgroundColor={backgroundColor}
    hoverColor={hoverColor}
    onClick={onClick}
    >
      <Label>{label}</Label>
    </Container>
  )
}
