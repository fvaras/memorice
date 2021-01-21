import axios from 'axios'
import { API_URL } from '../configs'

const instance = axios.create({
    baseURL: API_URL,
    // timeout: 1000,
    headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*"
    }
});

export default instance