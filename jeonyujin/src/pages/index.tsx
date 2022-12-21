import { Inter } from "@next/font/google";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import useTodos from "../hooks/useTodos";
import { instance } from "../libs/api";

const inter = Inter({ subsets: ["latin"] });
// node.js 새로 깔면서 생김 (폰트 지정? 사용법이 뭘까요)

export default function Home() {
  // Record[] 타입의 state 작성! "타입이 배열인 이유 = todo가 여러개"

  // GET(조회), POST(생성), PUT(수정), PATCH(수정), DELETE(삭제)
  const { todos, saveTodos } = useTodos();

  // saveTodos 처음 렌더링시키고 값 변동 시 re
  useEffect(() => {
    saveTodos();
  }, [saveTodos]);

  // state 생성 : 무엇을 입력했는지 알기 위해
  const [newTodo, setNewTodo] = useState<string>("");
  // onChange :  input 값 받아오기
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value);
  };

  // async await 이용 -> POST요청 후 saveTodos실행
  // saveTodos: GET 요청 다시 보내고 Re(setTodos) : 리스트 최신화
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

  return (
    <div>
      <h1>오늘 할 일</h1>
      {/* map((each, index)=>())가 기본값이나 todo의 경우 id와 fields.Name이 
      존재하므로 eachTodo하나의 인자만 받기 가능/todos 리스트렌더링 */}
      {todos.map((eachTodo) => (
        <div key={eachTodo.id}>
          <span>{eachTodo.fields.Name}</span>
        </div>
      ))}
      <form onSubmit={onSubmit}>
        <input type="text" value={newTodo} onChange={onChange} />
        <button type="submit">보내기</button>
      </form>
    </div>
  );
}
// ? 서버에서 데이터를 꺼내온다 (요청)
// ? 데이터 가져온 걸 set stating
// ? state를 리스트 렌더링 => GET 요청의 흐름!

// TODO "복습" : useState, useEffect, interface, map함수(key)
// TODO "학습" : GET, POST 회로 공부, async await개념, .then()함수
