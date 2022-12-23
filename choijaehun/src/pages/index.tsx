import React, { ChangeEvent, useState, FormEvent } from "react";
import styled from "styled-components";
import useTodos from "../hooks/useTodos";
import { instance } from "../libs/api";

export default function Home() {
  const { todos, saveTodos } = useTodos();
  // const { newTodo, setNewTodo } = useState<string>("");
  const [newTodo, setNewTodo] = useState<string>("");

  const onWriteChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value);
  };

  const onSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
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

    // instance.post("/todos", {
    //   records: [
    //     {
    //       fields: {
    //         Name: newTodo,
    //       },
    //     },
    //   ],
    // });
    // await saveTodos();
    // setNewTodo("");
  };

  // DELETE `/category/1` = 1번 카테고리 삭제 형식에 맞게 사용
  // const onDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
  //   instance.delete(`/todos/${e.currentTarget.id}`).then(() => {
  //     saveTodos();
  //   });
  //   setNewTodo("");
  // };
  const onDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    await instance.delete(`/todos/${e.currentTarget.id}`);
    {
      saveTodos();
    }
    setNewTodo("");
  };

  // 수정? PUT or PATCH?
  const onUpdate = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // & 연산자를 사용해서 조건문 써보려고 하는데, 이부분에서 어떻게 해야될까 음
    // alert(newTodo === "" || "수정사항 입력바람");
    // 두개가 다 참이면?
    // 만약 수정란이 비어있다면 경고창을 띄우고 그렇지 않다면 수정하게끔.
    // 그렇지 않다면 부분을 모르겠다 ㅏ ?????
    alert(newTodo === "" && "수정사항 입력바람");
    await instance.patch("/todos", {
      records: [
        {
          id: e.currentTarget.id, // 이게 어떤 todo를 바꿀껀지 알아야하니까 id도 추가해줘야함
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
    <StyledContainer>
      <h1>오늘의 할일</h1>
      {todos.map((eachTodo) => (
        <StyledDiv key={eachTodo.id}>
          <StyledSpan>{eachTodo.fields.Name}</StyledSpan>
          <StyledButton onClick={onDelete} id={eachTodo.id}>
            Del
          </StyledButton>
          <StyledButton onClick={onUpdate} id={eachTodo.id}>
            Modify
          </StyledButton>
        </StyledDiv>
      ))}

      <StyledForm onSubmit={onSubmit}>
        <StyledInput type="text" value={newTodo} onChange={onWriteChange} />
        <StyledButton type="submit">보내기</StyledButton>
      </StyledForm>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  width: 800px;
  height: auto;
  border: 3px solid #cccccc;
  margin: 0 auto;
  position: relative;
  top: 200px;
  text-align: center;
`;

const StyledDiv = styled.div`
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StyledButton = styled.button`
  width: 10%;
  margin: 0 auto;
  margin-bottom: 10px;
  background-color: white;
  cursor: pointer;
  border: 1px solid #ccc;
  border-radius: 10px;
  :hover {
    background-color: #ccc;
    color: white;
    transition: all 0.3s;
    transform: rotate(10deg);
  }
`;

const StyledSpan = styled.span`
  font-size: 16px;
  font-weight: 700;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const StyledInput = styled.input`
  width: 30%;
  margin: 0 auto;
  margin-bottom: 20px;
`;
