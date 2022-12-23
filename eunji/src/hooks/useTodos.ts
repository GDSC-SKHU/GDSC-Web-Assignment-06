import { useCallback, useEffect, useState } from "react";
import { instance } from "../libs/api";

interface Record {
  id: string;
  createdTime: string;
  fields: {
    Name: string;
  };
}

interface Response {
  records: Record[];
}

const useTodos = () => {
  const [todos, setTodos] = useState<Record[]>([]);

  const saveTodos = useCallback(async () => {
    const response = await instance.get<Response>("/todos");
    setTodos(response.data.records);
  }, []);

  useEffect(() => {
    saveTodos();
  }, [saveTodos]);

  return { todos, saveTodos };
};

export default useTodos;
