import { ChangeEvent, FormEvent, useEffect, useState } from "react";
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

  const onDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(e.currentTarget.id);
    instance.delete(`/todos/${e.currentTarget.id}`).then(() => {
      saveTodos();
    });
    setNewTodo("");
  };

  return (
    <div>
      <h1>오늘 할 일</h1>

      {todos.map((eachTodo) => (
        <div key={eachTodo.id}>
          <span>{eachTodo.fields.Name}</span>
          <button onClick={onDelete} id={eachTodo.id}>
            삭제
          </button>
          <button>수정</button>
        </div>
      ))}

      <form onSubmit={onSubmit}>
        <input type="text" value={newTodo} onChange={onChange} />
        <button type="submit">보내기</button>
      </form>
    </div>
  );
}
