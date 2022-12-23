import { ChangeEvent, FormEvent, useState } from "react";
import { instance } from "../libs/api";
import useTodos from "../hooks/useTodos";
import styled from "styled-components";

const Comment = ({
  id,
  commentInput,
  putInput,
}: {
  id: string;
  commentInput: string;
  putInput: Function;
}) => {
  const [inputBox, setInputBox] = useState(true);

  const onDelete = (e: FormEvent<HTMLDivElement>) => {
    instance.delete(`/todos/${id}`).then(() => {
      putInput();
    });
  };

  const [fixTodo, setFixTodo] = useState<string>("");

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFixTodo(e.target.value);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (fixTodo === "") {
      alert("글이 없습니다.");
      return;
    }
    instance
      .patch("/todos", {
        records: [
          {
            id: id,
            fields: {
              name: fixTodo,
            },
          },
        ],
      })
      .then(() => {
        putInput();
      });
    setInputBox(true);
  };

  return (
    <>
      {inputBox ? (
        <div onClick={() => setInputBox(!inputBox)}>
          {commentInput}
          <StyledSpan>click</StyledSpan>
        </div>
      ) : (
        <form onSubmit={onSubmit}>
          <input type="text" value={fixTodo} onChange={onChange} />
        </form>
      )}
      <StyledDivbtn onClick={onDelete}>삭제</StyledDivbtn>
    </>
  );
};

export default function Home() {
  const { todos, saveTodos } = useTodos();

  const [newTodo, setNewTodo] = useState<string>("");

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newTodo === "") {
      alert("글이 없습니다.");
      return;
    }
    instance
      .post("/todos", {
        records: [
          {
            fields: {
              name: newTodo,
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
    <StyledDiv>
      <StyledH1>to-do list</StyledH1>

      {todos.map((eachTodo) => (
        <div key={eachTodo.id}>
          <Comment
            id={eachTodo.id}
            commentInput={eachTodo.fields.name}
            putInput={saveTodos}
          />
        </div>
      ))}

      <form onSubmit={onSubmit}>
        <StyledInput type="text" value={newTodo} onChange={onChange} />
        <StyledButton type="submit">보내기</StyledButton>
      </form>
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  margin: 3px;
  padding: 5px;

  width: 300px;
  height: 300px;

  background-color: pink;
  border: 1px solid #ee90a0;

  overflow: scroll;
`;

const StyledH1 = styled.h1`
  text-align: center;

  color: white;
`;

const StyledDivbtn = styled.div`
  width: 36px;
  height: 20px;
  background-color: white;
`;

const StyledSpan = styled.span`
  margin-left: 10px;
  width: 36px;
  height: 20px;
  background-color: pink;
  color: white;
`;
const StyledInput = styled.input`
  margin-top: 170px;
  margin-left: 50px;

  border: 1px solid #f95d77;
`;
const StyledButton = styled.button`
  margin-left: 2px;
  border: 1px #ee90a0;
  border-radius: 5%;
`;
