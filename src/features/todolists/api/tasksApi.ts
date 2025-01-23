import {instance} from "common/instance";
import type {BaseResponse} from "common/types";
import {
    DomainTask,
    GetTasksResponse,
    UpdateTaskModel
} from "./tasksApi.types";

export const tasksApi = {
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
    },
    createTask(payload: { title: string; todolistId: string }) {
        const {title, todolistId} = payload
        return instance.post<BaseResponse<{ item: DomainTask }>>(`todo-lists/${todolistId}/tasks`, {title})
    },
    deleteTask(payload: { todolistId: string; taskId: string }) {
        const {todolistId, taskId} = payload
        return instance.delete<BaseResponse>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(payload: { task: DomainTask, model: UpdateTaskModel }) {
        const {task, model} = payload
        return instance.put<BaseResponse<{ item: DomainTask }>>(`todo-lists/${task.todoListId}/tasks/${task.id}`, model)
    }
}