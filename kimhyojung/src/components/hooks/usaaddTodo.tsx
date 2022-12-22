import { useState, useRef } from 'react';
import airtableInstance from '../../lib/api/airtableapi';
import useTodos from './useTodos';
import React from 'react';
const UseaddTodo = () => {
  const { todos, settodos } = useTodos();
  const [newTodo, setnewTodo] = useState<string>('');
  const newTodoRef = useRef<HTMLInputElement>(null);
  const onclick = (event: React.MouseEvent) => {
    if (newTodoRef.current == null) {
      return;
    }
    setnewTodo(newTodoRef.current.value);
  };

  const onsubmit = (event: React.FormEvent<HTMLFormElement>) => {
    airtableInstance
      .post('/todos', {
        records: [
          {
            fields: {
              Name: newTodo,
            },
          },
        ],
      })
      .then((response) => {
        settodos(response.data.records);
      });
  };

  return (
    <form onSubmit={onsubmit}>
      <input ref={newTodoRef}></input>
      <button type="submit" onClick={onclick}>
        추가
      </button>
    </form>
  );
};

export default UseaddTodo;
