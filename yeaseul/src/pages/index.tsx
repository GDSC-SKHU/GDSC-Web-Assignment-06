import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { instance } from "../libs/api";
import useTodos from "../hooks/useTodos";
import styled from "styled-components";
import Image from "next/image";
import { AiOutlineCheck } from "react-icons/ai";
import { MdOutlineCancel } from "react-icons/md";

const Comment = ({
  id,
  commentInput,
  prevFix,
  putInput,
}: {
  id: string;
  commentInput: string;
  prevFix: string;
  putInput: Function;
}) => {
  const [inputBox, setInputBox] = useState(true);

  const onDelete = (e: React.FormEvent<HTMLDivElement>) => {
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
      alert("입력이 필요합니다.");
      return;
    }
    instance
      .patch("/todos", {
        records: [
          {
            id: id,
            fields: {
              Comment: fixTodo,
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
        <CommentDiv onClick={() => setInputBox(!inputBox)}>
          {commentInput}
        </CommentDiv>
      ) : (
        <FixForm onSubmit={onSubmit}>
          <FixInputBox type="text" value={fixTodo} onChange={onChange} />
        </FixForm>
      )}
      <div onClick={onDelete}>
        <MdOutlineCancel size={30} />
      </div>
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
      alert("입력이 필요합니다.");
      return;
    }
    instance
      .post("/todos", {
        records: [
          {
            fields: {
              Comment: newTodo,
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
      <Title>Record Your Todos</Title>
      <RecordBox>
        <Image
          key={"recordPic"}
          src={"/recordPic.webp"}
          alt={"recordPic"}
          width={300}
          height={350}
        />
      </RecordBox>
      {todos.map((eachTodo) => (
        <TodoListBox key={eachTodo.id}>
          <AiOutlineCheck size={30} />
          <Comment
            id={eachTodo.id}
            commentInput={eachTodo.fields.Comment}
            prevFix={newTodo}
            putInput={saveTodos}
          />
        </TodoListBox>
      ))}

      <SubmitForm onSubmit={onSubmit}>
        <SubmitInput type="text" value={newTodo} onChange={onChange} />
        <SaveBtn type="submit">저장</SaveBtn>
      </SubmitForm>
    </div>
  );
}

const FixForm = styled.form``;
const FixInputBox = styled.input`
  width: 13.7rem;
  height: 2rem;
  margin: 0px 10px;
`;

const SubmitForm = styled.form`
  display: flex;
  justify-content: center;
`;
const SubmitInput = styled.input`
  height: 2rem;
  width: 15rem;
`;

const SaveBtn = styled.button`
  padding: 5px;
  font-size: 15px;
`;
const RecordBox = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 3rem;
`;

const CommentDiv = styled.div`
  width: 15rem;
  padding-left: 1rem;
`;

const Title = styled.h1`
  text-align: center;
  margin: 50px;
`;
const TodoListBox = styled.div`
  display: flex;
  justify-content: center;
  margin: 5px;
  font-size: 20px;
`;
// 1. 서버에서 데이터 요청
// 2. 받아온걸 그린다.
// Record[] 타입의 state를 만듬
// 이름은 todos
// 초기값은
