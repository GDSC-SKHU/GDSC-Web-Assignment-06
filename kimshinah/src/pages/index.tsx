import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import useTodos from "../hooks/useTodos";
import { instance } from "../libs/api";
import styled from "styled-components";

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

  const [style, setStyle] = useState({ display: "none" });

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
    setStyle({ display: "flex" });
  };

  const changeStyle = () => {
    style.display = "none";
  };

  return (
    <WrapperClass>
      <h1>오늘 할 일</h1>

      <TodoPostForm>
        <form onSubmit={onSubmit}>
          <input type="text" value={newTodo} onChange={onChange} />
          <button type="submit">보내기</button>
        </form>
      </TodoPostForm>

      {todos.map((eachTodo) => (
        <TodoList key={eachTodo.id}>
          <span>{eachTodo.fields.Name}</span>
          <div>
            <button onClick={onDelete} id={eachTodo.id}>
              삭제
            </button>
            <button onClick={changeTodoId} id={eachTodo.id}>
              수정
            </button>
          </div>
        </TodoList>
      ))}

      <HideModal style={style}>
        <form onSubmit={onUpdate}>
          <input
            type="text"
            id={currentValueId}
            value={updateTodo}
            onChange={onNewChange}
            placeholder={currentValue}
          />
          <button type="submit" onClick={changeStyle}>
            수정하기
          </button>
        </form>
      </HideModal>
    </WrapperClass>
  );
}

const WrapperClass = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TodoList = styled.div`
  width: 50%;
  display: flex;
  justify-content: space-between;
  margin: 0.5em;
  max-width: 20em;
`;
const TodoPostForm = styled.div`
  form {
    display: flex;
    width: 25em;
    height: 3em;
    margin: 1em;
  }
  input {
    width: 85%;
  }
`;
const HideModal = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(1, 1, 1, 0.5);
  position: absolute;
  top: 0;
  left: 0;

  justify-content: center;
  form {
    width: 20em;
    height: 3em;
    display: flex;
    justify-content: space-between;
    margin: 10em 0;
  }
  input {
    width: 18em;
    height: 100%;
    padding: 0;
    margin: 0;
    border: 0;
  }
  button {
    height: 100%;
    margin: 0;
    border: 0;
  }
`;
