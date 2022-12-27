import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import useTodos from "../hooks/useTodos";
import { instance } from "../libs/api";

export default function Home() {
  const { todos, saveTodos } = useTodos();

  const [newTodo, setNewTodo] = useState<string>("");

  const [currentValue, setcurrentValue] = useState("");

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value);
    console.dir(todos);
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

  //이벤트 객체에도 타입을 지정할 수가 있다. 그래서 MouseEvent 타입을 지정해준 것
  const onDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(e.currentTarget.id);
    instance.delete(`/todos/${e.currentTarget.id}`).then(() => {
      saveTodos();
    });
    setNewTodo("");
  };

  //수정함수
  const onUpdate = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.dir(e.currentTarget.id);

    const currentValue = todos.filter(
      (value) => value.id === e.currentTarget.id
    );
    setcurrentValue(currentValue[0].fields.Name);
  };

  //수정하기 button을 눌렀을때 수정 모달로 가면서 id 값을 전달할 것임. 그렇기때문에 Todo의 고유 id를 받아오는 것을 설정.
  const changeTodoId = (e: React.MouseEvent<HTMLButtonElement>) => {};

  return (
    <div>
      <h1>오늘 할 일</h1>

      {todos.map((eachTodo) => (
        <div key={eachTodo.id}>
          <span>
            {eachTodo.fields.Name}
            <button onClick={onDelete} id={eachTodo.id}>
              삭제
            </button>
            <button onClick={onUpdate} id={eachTodo.id}>
              수정
            </button>
          </span>
        </div>
      ))}

      <form onSubmit={onSubmit}>
        <input type="text" value={newTodo} onChange={onChange} />
        <button type="submit">보내기</button>
      </form>

      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={newTodo}
          onChange={onChange}
          placeholder={currentValue}
        />
        <button type="submit">수정하기</button>
      </form>
    </div>
  );
}
