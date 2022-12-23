// 커스텀 훅은 use로 시작 필수!
// saveTodos를 onSubmit에서 사용하기 위한 hook

import { useCallback, useEffect, useState } from "react";
import { instance } from "../libs/api";

interface Record {
  id: string;
  createdTime: string;
  fields: {
    Name: string;
  };
}

// 타입 : array 지정
interface Response {
  records: Record[];
}

// useTodos: todos와 useCallback 함수 반환 (GET 요청)
const useTodos = () => {
  // "타입이 배열인 이유 = todo가 여러개"
  // state 선언 이유: todos 변동 시 렌더링
  const [todos, setTodos] = useState<Record[]>([]);

  // deps가 바뀌지 않는 이상 동일한 함수(참조 동일성)
  const saveTodos = useCallback(async () => {
    // async await 문법 : 비동기 코드 동기적으로 작성 가능
    const response = await instance.get<Response>("/todos");
    // Don't repeat yourself 한 코드
    setTodos(response.data.records);
    // ? id, createdTime은 안 그려지는 이유
  }, []);

  // saveTodos 처음 렌더링, 값 변동 시 re
  useEffect(() => {
    saveTodos();
  }, [saveTodos]);

  return { todos, saveTodos };
};

export default useTodos;
