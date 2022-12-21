import axios, { AxiosInstance } from 'axios';

const airtableInstance: AxiosInstance = axios.create({
  baseURL: 'https://api.airtable.com/v0/appehtTwL5nVnuzTk',
  headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}` },
});

export default airtableInstance;
