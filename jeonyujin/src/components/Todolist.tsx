import { ChangeEvent, FormEvent, useState } from "react";
import styled from "styled-components";
import { instance } from "../libs/api";
import Image from "next/image";
import pic from "../../public/delete.png";

interface Props {
  id: string;
  listInput: string;
  putInput: Function;
}

export const Todolist = ({ id, listInput, putInput }: Props) => {
  const [input, setInput] = useState(true);

  const Delete = (e: React.MouseEvent<HTMLButtonElement>) => {
    instance.delete(`/todos/${id}`).then(() => {
      putInput();
    });
  };

  const [patchTodo, setPatchTodo] = useState<string>("");

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPatchTodo(e.target.value);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (patchTodo === "") {
      alert("수정은 하셔야죠!");
      return;
    }
    instance
      .patch("/todos", {
        records: [
          {
            id: id,
            fields: {
              Name: patchTodo,
            },
          },
        ],
      })
      .then(() => {
        putInput();
      });
    setInput(true);
  };

  return (
    <>
      {input ? (
        <ListDiv onClick={() => setInput(!input)}>{listInput}</ListDiv>
      ) : (
        <PatchForm onSubmit={onSubmit}>
          <PatchInput type="text" value={patchTodo} onChange={onChange} />
        </PatchForm>
      )}
      <Deletebtn onClick={Delete}>
        <Image src={pic} alt="삭제" placeholder="blur" width={25}/>
      </Deletebtn>
    </>
  );
};

const ListDiv = styled.div`
  margin: 20px 10px;
  font-size: 1.2em;
  display: inline-flex;
  text-align: center;
  align-items: center;
  justify-content: center;
`;

const PatchForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PatchInput = styled.input`
  display: flex;
  align-items: center;
  justify-content: center;
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

const Deletebtn = styled.button`
  cursor: pointer;
  outline: none;
  border: 0;
`;

