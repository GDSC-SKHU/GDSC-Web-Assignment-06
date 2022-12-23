import { useState, useRef, MouseEvent, FormEvent } from 'react';
import airtableInstance from '../../lib/api/airtableapi';
import useTodos from './useTodos';
import React from 'react';
import { ERROR_MESSAGE } from '../../constants';

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
    if (newTodoRef.current == null) {
      return;
    }
    if (newTodoRef.current.value === '') {
      alert(ERROR_MESSAGE);
      return;
    }
    const addData = async () => {
      await airtableInstance
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

    addData();
  };

  return { newTodo, onclick, onsubmit, newTodoRef };
};

export default useaddTodo;
