import styled from 'styled-components';

export const Input = styled.input`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background-color: ${(props) =>
    props.name === 'income' ? '#E7EBF7' : props.name === 'expenditure' ? '#F7E7E7' : 'transparent'};
  border: none;
  border-radius: 10px;
  font-size: 16px;
  padding: 8px;
  cursor: ${(props) => (props.readOnly ? 'default' : 'text')};
`;

export const Textarea = styled.textarea`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background-color: ${(props) =>
    props.name === 'income' ? '#E7EBF7' : props.name === 'expenditure' ? '#F7E7E7' : 'transparent'};
  border: none;
  border-radius: 10px;
  font-size: 16px;
  padding: 8px;
  cursor: ${(props) => (props.readOnly ? 'default' : 'text')};
`;