import React, { ChangeEvent, useState } from "react";
import useTodos from "../hooks/useTodos";
import { instance } from "../libs/api";

import styled from "styled-components";

export default function Home() {
  const { todos, saveTodos } = useTodos();
  const [newTodo, setNewTodo] = useState<string>("");

  const onSubmitChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value);
  };

  const onSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newTodo === "") {
      alert("글을 입력해 주세요.");
      return;
    }
    await instance.post("/todos", {
      records: [
        {
          fields: {
            Name: newTodo,
          },
        },
      ],
    });
    {
      saveTodos();
    }
    setNewTodo("");
  };

  const onDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    await instance.delete(`/todos/${e.currentTarget.id}`);
    {
      saveTodos();
    }
    setNewTodo("");
  };

  // 수정
  const onUpdate = async(e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await instance.patch("/todos", {
      records: [
        {
          id: e.currentTarget.id,
          fields: {
            Name: newTodo,
          },
        },
      ],
    });
    {
      saveTodos();
    }
    setNewTodo("");
  };

  return (
    <Container>
      <h1>Today Eunji's Todos</h1>
      {todos.map((eachTodo) => (
        <StyledDiv key={eachTodo.id}>
          <StyledTodo>{eachTodo.fields.Name}</StyledTodo>
          <StyledButton onClick={onUpdate} id={eachTodo.id}>수정</StyledButton>
          <StyledButton onClick={onDelete} id={eachTodo.id}>삭제</StyledButton>
        </StyledDiv>
      ))}
      <form onSubmit={onSubmit}>
        <StyledInput type="text" value={newTodo} onChange={onSubmitChange} />
        <StyledButton type="submit">입력</StyledButton>
      </form>
    </Container>
  );
}

const Container = styled.div`
  width: 50%;
  margin: 1rem auto 0;
  
  border: 1px solid lightpink;
  text-align: center;
`;

const StyledDiv = styled.div`
  margin-bottom: 1rem;
`;

const StyledTodo = styled.span`
  margin-right: 1rem;

  font-weight: 500;
`;

const StyledButton = styled.button`
  width: 40px;
  height: 20px;
  margin: 0 auto 1rem;
  margin-left: 10px;

  background-color: pink;
  
  border: none;
  border-radius: 5px;
  font-weight: 50;
  cursor: pointer;

  &:hover {
    background-color: black;
    color: pink;
  }
`;

const StyledInput = styled.input`
  width: 30%;

  border: none;
  border-bottom: 1px solid black;
  outline: none;
`;