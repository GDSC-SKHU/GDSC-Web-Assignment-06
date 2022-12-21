import axios from "axios";

export const instance = axios.create({
    baseURL: "https://api.airtable.com/v0/appcPS8MQisCxTMK3/",
    headers:{Authoriztion: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`},
});