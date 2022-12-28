import axios from "axios";

export const instance = axios.create({
  baseURL: "https://api.airtable.com/v0/appW1bxUFKhfvJcS7/",
  headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}` },
});

// axios 인터셉터

// req interceptor, res interceptor (상태에 따라)

// get, put, patch, delete, post
