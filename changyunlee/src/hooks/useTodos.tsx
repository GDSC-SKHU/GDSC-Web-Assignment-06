import { useCallback, useEffect, useState } from 'react';
import { instance } from '../libs/api';

interface Record {
  id: string;
  createdTime: string;
  fields: {
    name: string;
  };
}

interface Response {
  records: Record[];
}

const useTodos = () => {
  // 1. todos
  const [todos, setTodos] = useState<Record[]>([]);

  // 2. saveTodos
  const saveTodos = useCallback(async () => {
    const response = await instance.get<Response>('/Todos');
    setTodos(response.data.records);
  }, []);

  useEffect(() => {
    saveTodos();
  }, [saveTodos]);

  // DELETE request using axios with async/await

  return { todos, saveTodos };
};

export default useTodos;
