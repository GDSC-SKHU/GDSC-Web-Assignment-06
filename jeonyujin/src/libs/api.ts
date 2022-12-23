import axios from "axios";

export const instance = axios.create({
  baseURL: "https://api.airtable.com/v0/appyNQQ67gaRME4kZ/",
  headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}` },
});

// ? 인터셉터 -> 개인적 공부
// ? req interceptor, res interceptor (상태에 따라)
// ? get, put, patch, delete, post
// 요청들을 모듈화하여 함수로 작성 시 instance.get -> get 가능