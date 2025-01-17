import axios from "axios";
import {CreateTodolistResponse, DeleteTodolistResponse, Todolist, UpdateTodolistResponse} from "./todolistsApi.types";

export const todolistsApi = {

    getTodolists() {
        return axios.get<Todolist[]>('https://social-network.samuraijs.com/api/1.1/todo-lists', {
            headers: {
                Authorization: 'Bearer 6abad6d5-ca67-446c-9608-5cdc421e16de',
            },
        })
    },

    updateTodolists(payload: { id: string, title: string }) {
        const {title, id} = payload;
        return axios.put<UpdateTodolistResponse>(
            `https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`,
            {title},
            {
                headers: {
                    Authorization: 'Bearer 6abad6d5-ca67-446c-9608-5cdc421e16de',
                    'API-KEY': '20ec9fd3-c1ad-43e9-9a4d-faa6638153bf',
                },
            }
        )
    },

    createTodolist(title: string) {
        return axios.post<CreateTodolistResponse>(
            'https://social-network.samuraijs.com/api/1.1/todo-lists',
            {title},
            {
                headers: {
                    Authorization: 'Bearer 6abad6d5-ca67-446c-9608-5cdc421e16de',
                    'API-KEY': '20ec9fd3-c1ad-43e9-9a4d-faa6638153bf',
                },
            }
        )
    },

    deleteTodolist(id: string) {
        return axios.delete<DeleteTodolistResponse>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`, {
            headers: {
                Authorization: 'Bearer 6abad6d5-ca67-446c-9608-5cdc421e16de',
                'API-KEY': '20ec9fd3-c1ad-43e9-9a4d-faa6638153bf',
            },
        })
    },

}