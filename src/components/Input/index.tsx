import React from 'react';
import styled from 'styled-components';

const InputBox = styled.input`
  font-size: 16px;
  padding: 10px 10px;
  border-radius: 8px;
  border: 1px solid #bdbdbd;
  outline: none;
`;

interface Props {
  readonly placeholder?: string;
  readonly value?: string;
  readonly onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = ({ placeholder, onChange, value }: Props) => {
  return (
    <InputBox 
    placeholder={placeholder} 
    value={value}
    onChange={onChange}
    />
  )
}