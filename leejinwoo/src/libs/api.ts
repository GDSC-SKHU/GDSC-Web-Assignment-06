import axios from "axios";

export const instance = axios.create({
  baseURL: "https://api.airtable.com/v0/appYvF8yBrqR7OKYl/",
  headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}` },
});
