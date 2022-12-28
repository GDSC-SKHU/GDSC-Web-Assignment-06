import { ChangeEvent, FormEvent, MouseEvent, useEffect, useState } from "react";
import styled from "styled-components";
import { GlobalStyle } from "../styles/GlobalStyle";
import useTodos from "../hooks/useTodos";
import { instance } from "../libs/api";

export default function Home() {
  const { todos, saveTodos } = useTodos();

  const [newTodo, setNewTodo] = useState<string>("");

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    instance
      .post("/todos", {
        records: [
          {
            fields: {
              Name: newTodo,
            },
          },
        ],
      })
      .then(() => {
        saveTodos();
      });

    setNewTodo("");
  };

  const onClickPatch = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    instance
      .patch("/todos", {
        records: [
          {
            id: e.currentTarget.value,
            fields: {
              Name: newTodo,
            },
          },
        ],
      })
      .then(() => {
        saveTodos();
      });

    setNewTodo("");
  };

  const Airtable = require("airtable");
  const base = new Airtable({ apiKey: "keyxDZT06vLKQQ68F" }).base(
    "appYvF8yBrqR7OKYl"
  );
  const onClickDelete = (e: MouseEvent<HTMLButtonElement>) => {
    //이벤트 핸들러
    const toDelete = e.currentTarget.value;
    base("todos").destroy([toDelete], function () {
      console.log("컷컷컷");
      saveTodos();
    });
  };

  return (
    <>
      <GlobalStyle />
      <StyledMain>
        <StyledH1>Todo List</StyledH1>
        <StyledAllTodo>
          {todos.map((eachTodo) => (
            <StyledTodoList key={eachTodo.id}>
              <StyledTodo>{eachTodo.fields.Name}</StyledTodo>
              <div>
                <StyledBtn
                  name={eachTodo.fields.Name}
                  value={eachTodo.id}
                  onClick={onClickPatch}
                >
                  수정
                </StyledBtn>
                <StyledBtn
                  name={eachTodo.fields.Name}
                  value={eachTodo.id}
                  onClick={onClickDelete}
                >
                  삭제
                </StyledBtn>
              </div>
            </StyledTodoList>
          ))}
        </StyledAllTodo>
        <StyledForm onSubmit={onSubmit}>
          <StyledInput type="text" value={newTodo} onChange={onChange} />
          <StyledBtn type="submit">보내기</StyledBtn>
        </StyledForm>
        <StyledNotify> Notify : 수정시 입력 후 수정버튼 누를것</StyledNotify>
      </StyledMain>
    </>
  );
}

const StyledMain = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;

  background-color: #3c6255;
  border-radius: 15px;

  margin-top: 100px;
  width: 350px;
  height: 500px;
`;

const StyledH1 = styled.h1`
  color: #eae7b1;
`;

const StyledAllTodo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
`;

const StyledTodoList = styled.div`
  display: flex;
  justify-content: space-between;

  width: 90%;
  margin-top: 10px;

  border-bottom: 3px solid #61876e;
`;

const StyledTodo = styled.span`
  color: #eae7b1;
`;

const StyledBtn = styled.button`
  all: unset;
  background-color: #a6bb8d;
  border-radius: 5px;
  margin-left: 5px;
  color: #3c6255;

  :hover{
    cursor: pointer;
  }
  :active{
    background-color: #3c6255;
    color: #eae7b1;
  }
`;

const StyledForm = styled.form``;

const StyledInput = styled.input`
  all: unset;
  padding: 0 10px;
  width: 200px;

  border-radius: 15px;

  background-color: #eae7b1;
  color: #3c6255;
`;

const StyledNotify = styled.span`
  color: #eae7b1;
`;
