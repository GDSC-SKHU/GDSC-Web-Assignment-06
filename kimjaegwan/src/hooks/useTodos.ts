import React, { useEffect, useState, useCallback } from 'react';
import instance from '../libs/instances';

interface Record {
    id: string;
    createTime: string;
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
        const res = await instance.get<Response>('/todos');
        setTodos(res.data.records);
        console.log(res);
    }, []);

    useEffect(() => {
        saveTodos();
    }, [saveTodos]); // ? 개념이 재귀적으로 이해되어 혼란스러움 saveTodos의 함수를 감시한다는 것이 이해가 안감 saveTodos가 외부에서 실행될 때 커스텀 훅 내부에서 saveTodos();를 실행한다는 것인가요?

    return { todos, saveTodos };
};

export default useTodos;
