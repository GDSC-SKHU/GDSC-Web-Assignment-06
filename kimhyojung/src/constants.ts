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
const UPDATE_CONFIRM_MESSAGE: string = '수정이 완료되었습니다';
export { ERROR_MESSAGE, UPDATE_CONFIRM_MESSAGE };
export type { records, todoState };
