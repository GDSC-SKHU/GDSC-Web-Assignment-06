// 커스텀 훅은 꼭 use로 시작해야함
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

  // useCallback, useMemo => 디펜던시 어레이가 바뀌지 않는 이상 동일한 함수임
  // 참조 동일성이 보장됨

  // const a = () => {};
  // 메모리 주소가 달라져서
  // 참조 동일성이 안됨

  return { todos, saveTodos };
};

export default useTodos;
