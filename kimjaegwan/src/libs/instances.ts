import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://api.airtable.com/v0/appobFQAlJkM2roqJ/',
    headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}` },
});

export default instance;
