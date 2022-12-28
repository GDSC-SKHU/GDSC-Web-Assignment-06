import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import useTodos from "../hooks/useTodos";
import { instance } from "../libs/api";

export default function Home() {
  const { todos, saveTodos } = useTodos();

  //submit input 값이 변경되는 것을 감지
  const [newTodo, setNewTodo] = useState<string>("");
  //update input  값이 변경되는 것을 감지
  const [updateTodo, setUpdateTodo] = useState<string>("");

  //수정 버튼을 누른 그 버튼의 id 값 가져오기
  const [currentValueId, setCurrentValueId] = useState<string>("");
  //해당 아이디 값의 name 가져오기
  const [currentValue, setCurrentValue] = useState("");

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value);
  };

  const onNewChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUpdateTodo(e.target.value);
    console.log(e.target.value);
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

  const onUpdate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e.currentTarget.id);
    instance
      .patch("/todos", {
        records: [
          {
            id: currentValueId,
            fields: {
              Name: updateTodo,
            },
          },
        ],
      })
      .then(() => {
        saveTodos();
      });
    setUpdateTodo("");
  };

  //저장된 todoId를 이용하여 placeholder에 뜨게하기
  const changeTodoId = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.dir(e.currentTarget.id);

    const currentValue = todos.filter(
      (value) => value.id === e.currentTarget.id
    );
    setCurrentValueId(e.currentTarget.id);
    setCurrentValue(currentValue[0].fields.Name);
  };

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
            <button onClick={changeTodoId} id={eachTodo.id}>
              수정
            </button>
          </span>
        </div>
      ))}

      <form onSubmit={onSubmit}>
        <input type="text" value={newTodo} onChange={onChange} />
        <button type="submit">보내기</button>
      </form>

      <div>
        <form onSubmit={onUpdate}>
          <input
            type="text"
            id={currentValueId}
            value={updateTodo}
            onChange={onNewChange}
            placeholder={currentValue}
          />
          <button type="submit">수정하기</button>
        </form>
      </div>
    </div>
  );
}
