import useaddTodo from './components/hooks/usaaddTodo';
import styled from 'styled-components';
export default function Addtodo() {
  const { onclick, onsubmit, newTodoRef } = useaddTodo();
  return (
    <form onSubmit={onsubmit}>
      <StyledInput ref={newTodoRef}></StyledInput>
      <StyledButton type="submit" onClick={onclick}>
        추가
      </StyledButton>
    </form>
  );
}

const StyledInput = styled.input`
  border: 1px solid #e0e0e0;
  border-radius: 40px;
  background: none;
  margin: auto;
  padding: 3px;
  &:focus {
    background: #e0e0e0;
    color: black;
    font-weight: 700;
    border: none;
  }
`;

const StyledButton = styled.button`
  background: none;
  border: 1px solid #e0e0e0;
  cursor: pointer;
  padding: 3px;
  &:hover {
    background: #e0e0e0;
    color: black;
  }
`;
