import React, { FormEvent, useRef, useState, MouseEvent } from 'react';
import useTodos from './useTodos';
import { ERROR_MESSAGE, UPDATE_CONFIRM_MESSAGE } from '../../constants';
import airtableInstance from '../../lib/api/airtableapi';

const useupdateTodo = () => {
  const { todos, settodos } = useTodos();
  const [updateId, setupdateId] = useState<string>('');
  const [updatetodo, setupdateTodo] = useState<string>('');

  const onupdate: React.EventHandler<FormEvent> = () => {
    if (updatetodo === '') {
      alert(ERROR_MESSAGE);
      return;
    }

    const updateData = async () => {
      alert(UPDATE_CONFIRM_MESSAGE);
      await airtableInstance.patch('/todos', {
        records: [
          {
            id: updateId,
            fields: {
              Name: updatetodo,
            },
          },
        ],
      });
    };
    try {
      updateData();
    } catch (error) {
      console.log(error);
    }
  };

  return { updateId, setupdateId, updatetodo, setupdateTodo, onupdate };
};

export default useupdateTodo;
