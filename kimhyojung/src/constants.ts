import { type } from 'os';

interface records {
  id: string;
  createdTime: string;
  fields: {
    Name: string;
  };
}

interface todoState {
  state: string;
}

const ERROR_MESSAGE: string = '할 일을 입력해주세요';
export { ERROR_MESSAGE };
export type { records, todoState };
