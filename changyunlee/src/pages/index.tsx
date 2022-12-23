import { ChangeEvent, FormEvent, MouseEvent, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import GlobalStyle from '../../styles/GlobalStyle';
import useTodos from '../hooks/useTodos';
import { instance } from '../libs/api';

// airtable module required
// npm install airtable
const Airtable = require('airtable');
const base = new Airtable({ apiKey: 'key0F1DeRcTVsq55f' }).base('appxyQFxwVvKEKjvA');

export default function Home() {
  // todos, saveTodos 가져오기
  const { todos, saveTodos } = useTodos();

  // 1. 새로운 할일 생성
  const [newTodo, setNewTodo] = useState<string>('');

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value);
  };
  //

  // POST
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    instance
      .post('/Todos', {
        records: [
          {
            fields: {
              name: newTodo,
            },
          },
        ],
      })
      .then(() => {
        saveTodos();
      });
    setNewTodo('');
  };
  // UPDATE
  const onClickUpdate = (e: MouseEvent<HTMLButtonElement>) => {
    //이벤트 핸들러
    e.preventDefault();
    instance
      .patch('/Todos', {
        records: [
          {
            id: e.currentTarget.value,
            fields: {
              name: newTodo,
            },
          },
        ],
      })
      .then(() => {
        saveTodos();
      });
    setNewTodo('');
  };

  // DELETE
  const onClickDelete = (e: MouseEvent<HTMLButtonElement>) => {
    //이벤트 핸들러
    console.log('요소 id: ' + e.currentTarget.value); // id 확인
    const toDeleteName = e.currentTarget.value;
    base('todos').destroy([toDeleteName], function () {
      console.log('delete 확인');
      saveTodos();
    });
  };

  return (
    <>
      <GlobalStyle />
      <StyledTodoBox>
        <StyledTitle>오늘 할 일</StyledTitle>
        {todos.map((eachTodo) => (
          <StyledList key={eachTodo.id}>
            {/* <StyledContent1>{eachTodo.id}</StyledContent1> */}
            <StyledContent>{eachTodo.fields.name}</StyledContent>
            <StyledButton name={eachTodo.fields.name} value={eachTodo.id} onClick={onClickUpdate}>
              수정
            </StyledButton>
            <StyledButton value={eachTodo.id} onClick={onClickDelete}>
              삭제
            </StyledButton>
          </StyledList>
        ))}
        <StyledForm onSubmit={onSubmit}>
          <StyledInput>입력창</StyledInput>
          <input type='text' value={newTodo} onChange={onChange} />
          <StyledButton2 type='submit'>todos 추가</StyledButton2>
        </StyledForm>
        <StyledManual>
          <StyledWhatTodo>사용법</StyledWhatTodo>
          <StyledNumbering>1. todo 추가하기</StyledNumbering>
          <StyledNumberingContent>입력창에 할일 입력 후,&nbsp;&apos;todos 추가&apos; 클릭!</StyledNumberingContent>
          <StyledNumbering>2. todo 수정하기</StyledNumbering>
          <StyledNumberingContent>입력창에 할일 입력 후,&nbsp;수정하고 싶은 항목의 수정 버튼 클릭!</StyledNumberingContent>
          <StyledNumbering>3. todo 삭제하기</StyledNumbering>
          <StyledNumberingContent>삭제 버튼 클릭</StyledNumberingContent>
        </StyledManual>
      </StyledTodoBox>
      <StyledFooter>made by ChanGyun Lee</StyledFooter>
    </>
  );
}
const StyledFooter = styled.p`
  font-size: 10px;
  float: right;
  margin-right: 10px; ;
`;

const StyledNumberingContent = styled.div`
  font-size: 8px;
  color: #4628de;
  margin-bottom: 5px;
`;
const StyledNumbering = styled.div`
  font-size: 10px;
  margin-bottom: 2px;
`;
const StyledWhatTodo = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
`;

const StyledManual = styled.div`
  margin-top: 30px;
  background-color: #fbe6fb;
  padding: 20px;
  font-size: 12px;
  border-radius: 2px;
`;
const StyledInput = styled.div`
  font-size: 12px;
  margin-bottom: 3px;
`;
const StyledContent = styled.div`
  padding-right: 20px;
  width: 120px;
  display: inline-block;
  margin-bottom: 10px;
`;
const StyledTodoBox = styled.div`
  margin-top: 100px;
  border: 0px solid #444;
  border-radius: 20px;
  min-height: 400px;
  padding: 40px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  background-color: white;
  width: 250px;
`;
const StyledTitle = styled.h1`
  text-align: center;
`;
const StyledList = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
`;

const StyledForm = styled.form`
  margin-top: 30px;
`;
const StyledButton = styled.button`
  all: unset;
  font-size: 8px;
  padding: 0px 3px 0px 3px;
  margin: 3px;
  color: #888;
  border-bottom: 1px solid purple;
  &:hover {
    cursor: pointer;
  }
`;
const StyledButton2 = styled.button`
  all: unset;
  font-size: 8px;
  padding: 3px 3px 0px 3px;
  margin-right: 5px;

  color: #888;
  border-bottom: 1px solid purple;
  float: right;
  &:hover {
    cursor: pointer;
  }
`;
