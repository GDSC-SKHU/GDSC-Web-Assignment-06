import { useState, useRef, MouseEvent, FormEvent } from 'react';
import airtableInstance from '../../lib/api/airtableapi';
import useTodos from './useTodos';
import React from 'react';
const useaddTodo = () => {
  const { todos, settodos } = useTodos();
  const [newTodo, setnewTodo] = useState<string>('');
  const newTodoRef = useRef<HTMLInputElement>(null);
  const onclick: React.EventHandler<MouseEvent> = () => {
    if (newTodoRef.current == null) {
      return;
    }
    setnewTodo(newTodoRef.current.value);
  };

  const onsubmit: React.EventHandler<FormEvent> = () => {
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

  return { newTodo, onclick, onsubmit, newTodoRef };
};

export default useaddTodo;
