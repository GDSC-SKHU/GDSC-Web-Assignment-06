import airtableInstance from '../../lib/api/airtableapi';
import { records } from '../../constants';
import { useState, useEffect } from 'react';

/* useEffect 훅에서 async await를 통해 get요청*/
/* axios로 데이터를 가져오고 , 그것을 상태로(todos)에 저장해서 씀*/
/* 빈 배열을 넣는 이유 -> 마운트 될떄만 쓰기 위해서 */

const useTodos = () => {
  const [todos, settodos] = useState<records[]>([]);

  useEffect(() => {
    /* async 함수 fetchData를 useEffect 훅 안에서 정의하고, useEffect 훅 안에서 호출 */
    const fetchData = async () => {
      const response = await airtableInstance.get('/todos');
      settodos(response.data.records);
    };

    /* useEffect가 아무것도 반환하지 않는 걸 방지하기 위해, async함수를 수행해야 함 */
    fetchData();
  }, []);

  return { todos, settodos };
};

export default useTodos;
