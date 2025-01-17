import axios from "axios";

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    headers: {
        Authorization: 'Bearer 6abad6d5-ca67-446c-9608-5cdc421e16de',
        'API-KEY': '20ec9fd3-c1ad-43e9-9a4d-faa6638153bf',
    },
})