import React, { ChangeEvent, FormEvent, useState } from 'react';
import styled from 'styled-components';
import instance from '../libs/instances';
import useTodos from '../hooks/useTodos';
import { config } from 'process';
const Home = () => {
    const { todos, saveTodos } = useTodos();
    const [newTodo, setNewTodo] = useState<string>('');

    const _onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { target } = e;
        const { value } = target;
        setNewTodo(value);
    };

    const _onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        instance //이것도 어찌저찌하면 hooks안에 넣을 수 있을거같다
            .post('/todos', {
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
                // ? setNewTodo(''); 왜 여기에 들어가면 작동을 하지 않는지 이해가가지 않음
            });
        setNewTodo('');
    };

    //삭제 기능 구현
    const _onDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
        console.log(e.target.id); //? id속성이 있으나 린트에서는 없다고 뜸
        instance.delete(`/todos/${e.target.id}`).then(() => {
            saveTodos();
        });
        setNewTodo('');
    };

    return (
        <>
            <br />
            <h1>TodoList</h1>
            <StyledHomeBox>
                {todos.map((data) => (
                    <StyledTodo key={data.id}>
                        <p key={data.id}>{data.fields.Name} </p>
                        <button onClick={_onDelete} id={data.id}>
                            삭제
                        </button>
                        <button onClick={_onDelete} id={data.id}>
                            수정
                        </button>
                    </StyledTodo>
                ))}

                <form onSubmit={_onSubmit}>
                    <input
                        placeholder="입력하세요우."
                        onChange={_onChange}
                        value={newTodo}
                    ></input>
                    <button type="submit">추가</button>
                </form>
            </StyledHomeBox>
        </>
    );
};

export default Home;

const StyledHomeBox = styled.div`
    border: 3px solid black;
    width: 600px;
    margin-top: 1.875rem;
`;
const StyledTodo = styled.div`
    display: flex;
    flex-direction: row;
`;
