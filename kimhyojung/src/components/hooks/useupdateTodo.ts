import React, { FormEvent, useRef, useState, MouseEvent } from 'react';
import useTodos from './useTodos';
import { ERROR_MESSAGE } from '../../constants';
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
      alert(updateId);
      alert(updatetodo);
      await airtableInstance
        .patch('/todos', {
          records: [
            {
              id: updateId,
              fields: {
                Name: updatetodo,
              },
            },
          ],
        })
        .then((response) => settodos(response.data.records));
    };

    updateData();
  };

  return { updateId, setupdateId, updatetodo, setupdateTodo, onupdate };
};

export default useupdateTodo;
