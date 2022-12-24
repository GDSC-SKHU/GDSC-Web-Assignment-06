import styled from 'styled-components';
import useTodos from '../components/hooks/useTodos';
import usedeleteTodo from '../components/hooks/usedeleteTodo';
import Addtodo, { StyledInput } from '../Addtodo';
import useupdateTodo from '../components/hooks/useupdateTodo';

export default function Home() {
  const { todos, settodos } = useTodos();

  const { updateId, setupdateId, updatetodo, setupdateTodo, onupdate } =
    useupdateTodo();
  const onclickTodo = (newid: string, newtodo: string) => {
    console.log(newid, newtodo);
    setupdateId(newid);
    setupdateTodo(newtodo);
  };

  const changeTodo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setupdateTodo(event.target.value);
  };
  return (
    <>
      <StyledTitle>Todo Lists</StyledTitle>
      <StyledTodoLists>
        {todos.map((eachtodo) => (
          <StyledDiv key={eachtodo.id}>
            <StyledTodoList>
              <StyledContent>{eachtodo.fields.Name}</StyledContent>
            </StyledTodoList>
            <StyledInput key={eachtodo.id} onChange={changeTodo} />
            <StyledButtonArea>
              <form onSubmit={onupdate}>
                <StyledUpdateButton
                  type="submit"
                  onClick={() => onclickTodo(eachtodo.id, updatetodo)}
                >
                  갱신
                </StyledUpdateButton>
              </form>

              <StyledButton
                onClick={() => usedeleteTodo(eachtodo.id)}
              ></StyledButton>
            </StyledButtonArea>
          </StyledDiv>
        ))}
      </StyledTodoLists>
      <Addtodo />
    </>
  );
}

const StyledTodoLists = styled.article`
  display: inline-flex;
  flex-direction: column;
  width: 200px;
  flex-wrap: wrap;
  margin: 0 auto;
  justify-content: flex-end;
  border: 0.3px solid #414141;
  border-radius: 1%;
  gap: 10px;
  margin-bottom: 1%;
`;

const StyledButtonArea = styled.section`
  display: flex;
  width: 35%;
  justify-content: space-around;
`;

const StyledTodoList = styled.section`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: auto;
`;

const StyledTitle = styled.h3`
  display: flex;
  margin: 0 auto;
  font-weight: 700;
`;

const StyledDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: auto;
`;
const StyledContent = styled.span`
  background: none;
  border: none;
  display: inline;
  cursor: pointer;
  &:hover {
    color: #444;
  }
`;

const StyledButton = styled.button`
  width: 24px;
  height: 24px;
  background-image: url('/images/deletebutton.png');
  background-repeat: no-repeat;
  background-size: contain;
  border: none;
  cursor: pointer;
  background-color: black;
  &:hover {
    background-color: #444;
  }
`;

const StyledUpdateButton = styled.button`
  background: none;
  cursor: pointer;
  border: 1px solid black;
  padding: 3px;
  &:hover {
    background: #e0e0e0;
    color: black;
  }
`;
