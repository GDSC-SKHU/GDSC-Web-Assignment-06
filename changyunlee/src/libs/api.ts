import axios from 'axios';

// todos_hw
export const instance = axios.create({
  baseURL: 'https://api.airtable.com/v0/appxyQFxwVvKEKjvA',
  headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}` }, // from .env 파일
});

// .env 파일 만들어서 NEXT_PUBLIC_API_TOKEN에 토큰 값 할당
// .gitignore에 추가
