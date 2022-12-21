import axios from "axios";

export const instance = axios.create({
  baseURL: "https://api.airtable.com/v0/appyNQQ67gaRME4kZ/",
  headers: { Authorization: "Bearer keyRXmGbTnpHyCyHb" },
});

// ? 인터셉터 -> 개인적 공부
// ? req interceptor, res interceptor (상태에 따라)
// ? get, put, patch, delete, post
// instance를 함수로 작성 시 instance.get -> get 가능