import axios from "axios";
const api_key = process.env.EXPO_PUBLIC_API_KEY;

export const api = axios.create({
    baseURL : "https://watchoutdev.cloud/",
    headers : { 
        'wo_api_key': api_key, 'Content-Type': 'multipart/form-data'
    }
})