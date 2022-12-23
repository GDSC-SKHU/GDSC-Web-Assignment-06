import { ChangeEvent, FormEvent, useState } from "react";
import useTodos from "../hooks/useTodos";
import { instance } from "../libs/api";
import styled from "styled-components";
import { Todolist } from "./Todolist";
import Router from "next/router";
import router from "next/router";

export default function Todo() {
  // GET(조회), POST(생성), PUT(수정), PATCH(수정), DELETE(삭제)

  // 코드 추상화
  const { todos, saveTodos } = useTodos();

  // state 생성 : 무엇을 입력했는지 알기 위해
  const [newTodo, setNewTodo] = useState<string>("");

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newTodo === "") {
      alert("할 일이 없나요?");
      return;
    }

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
        // saveTodos: GET 재요청 후 다시 setTodos : 리스트 최신화
        saveTodos();
      });
    // saveTodos보다 먼저 실행
    setNewTodo("");
  };

  const onBack = () => {
    router.push({
      pathname: "/",
    });
  };

  // instance.delete<Response>("/todos");

  return (
    <div>
      <StyledH1>Today&apos;s todo</StyledH1>
      {/* map((each, index)=>()): 기본. todo는 id/fields.Name
      존재 eachTodo인자 하나만 받기 가능/todos 리스트렌더링 */}
      {todos.map((eachTodo) => (
        <TodoBox key={eachTodo.id}>
          <CheckInput type="checkbox" value="todo"></CheckInput>
          <Todolist
            id={eachTodo.id}
            listInput={eachTodo.fields.Name}
            putInput={saveTodos}
          />
        </TodoBox>
      ))}
      <SubmitForm onSubmit={onSubmit}>
        <ChangeInput type="text" value={newTodo} onChange={onChange} />
        <SubmitBtn type="submit">등록</SubmitBtn>
      </SubmitForm>
      <BtnBox>
        <BackBtn onClick={onBack}>돌아가기</BackBtn>
      </BtnBox>
    </div>
  );
}

const StyledH1 = styled.h1`
  margin-top: 5rem;
  margin-bottom: 3rem;
  text-align: center;
  text-decoration: underline double;
  text-underline-position: under;
`;

const TodoBox = styled.div`
  display: flex;
  justify-content: center;
`;

const CheckInput = styled.input`
  cursor: pointer;
  zoom: 1.5;
  padding: 10px;
`;

const SubmitForm = styled.form`
  margin: 0.5rem;
  display: flex;
  justify-content: center;
`;

const ChangeInput = styled.input`
  width: 12rem;
  height: 2.2rem;
  font-size: 15px;
  border: 0;
  border-radius: 15px;
  outline: none;
  padding-left: 20px;
  margin: 30px 10px;
  background-color: #e6e6e6;
`;

const SubmitBtn = styled.button`
  background-color: #4ceac5;
  border-radius: 8px;
  border-style: none;
  box-sizing: border-box;
  color: #ffffff;
  cursor: pointer;
  display: inline-flex;
  font-family: "Haas Grot Text R Web", "Helvetica Neue", Helvetica, Arial,
    sans-serif;
  font-size: 15px;
  font-weight: 500;
  height: 40px;
  line-height: 20px;
  list-style: none;
  margin: 0;
  outline: none;
  padding: 10px 16px;
  position: relative;
  text-align: center;
  text-decoration: none;
  transition: color 100ms;

  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;

  &:hover,
  &:focus {
    background-color: #82f0c4;
    transform: translateY(-2px);
  }
`;

const BtnBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BackBtn = styled.button`
  padding: 0.5rem;
  font-size: 15px;
  background-color: #0a6bff;
  border-radius: 4px;
  border: 0;
  box-shadow: rgba(1, 60, 136, 0.5) 0 -1px 3px 0 inset,
    rgba(0, 44, 97, 0.1) 0 3px 6px 0;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  &:hover {
    background-color: #065dd8;
    transform: translateY(2px);
  }
`;

// ? 서버에서 데이터를 꺼내온다 (요청)
// ? 데이터 가져온 걸 set stating
// ? state 리스트 렌더링 => GET 요청 흐름
// TODO -> PUT/PATCH/DELETE 하기
