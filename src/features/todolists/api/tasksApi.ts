import {
    CreateTaskResponse,
    DeleteTaskResponse, DomainTask,
    GetTasksResponse,
    UpdateTaskModel,
    UpdateTaskResponse
} from "./tasksApi.types";
import axios from "axios";

export const tasksApi = {
    getTasks(todolistId: string) {
        return axios.get<GetTasksResponse>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks`, {
            headers: {
                Authorization: 'Bearer 6abad6d5-ca67-446c-9608-5cdc421e16de',
                'API-KEY': '20ec9fd3-c1ad-43e9-9a4d-faa6638153bf',
            },
        })
    },

    createTask(payload: { title: string; todolistId: string }) {
        const {title, todolistId} = payload
        return axios.post<CreateTaskResponse>(
            `https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks`,
            {title},
            {
                headers: {
                    Authorization: 'Bearer 6abad6d5-ca67-446c-9608-5cdc421e16de',
                    'API-KEY': '20ec9fd3-c1ad-43e9-9a4d-faa6638153bf',
                },
            }
        )

    },

    deleteTask(payload: { todolistId: string; taskId: string }) {
        const {todolistId, taskId} = payload
        return axios.delete<DeleteTaskResponse>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks/${taskId}`, {
            headers: {
                Authorization: 'Bearer 6abad6d5-ca67-446c-9608-5cdc421e16de',
                'API-KEY': '20ec9fd3-c1ad-43e9-9a4d-faa6638153bf',
            },
        })

    },

    updateTask(payload: { task: DomainTask, model: UpdateTaskModel })
    {
        const {task, model} = payload
        return axios.put<UpdateTaskResponse>(
            `https://social-network.samuraijs.com/api/1.1/todo-lists/${task.todoListId}/tasks/${task.id}`,
            model,
            {
                headers: {
                    Authorization: 'Bearer 6abad6d5-ca67-446c-9608-5cdc421e16de',
                    'API-KEY': '20ec9fd3-c1ad-43e9-9a4d-faa6638153bf',
                },
            }
        )
    }
}