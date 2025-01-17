import {
    CreateTaskResponse,
    DeleteTaskResponse, DomainTask,
    GetTasksResponse,
    UpdateTaskModel,
    UpdateTaskResponse
} from "./tasksApi.types";
import {instance} from "../../../common/instance/instance";

export const tasksApi = {
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
    },
    createTask(payload: { title: string; todolistId: string }) {
        const {title, todolistId} = payload
        return instance.post<CreateTaskResponse>(`todo-lists/${todolistId}/tasks`, {title})
    },
    deleteTask(payload: { todolistId: string; taskId: string }) {
        const {todolistId, taskId} = payload
        return instance.delete<DeleteTaskResponse>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(payload: { task: DomainTask, model: UpdateTaskModel }) {
        const {task, model} = payload
        return instance.put<UpdateTaskResponse>(`todo-lists/${task.todoListId}/tasks/${task.id}`, model)
    }
}