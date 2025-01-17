import {CreateTodolistResponse, DeleteTodolistResponse, Todolist, UpdateTodolistResponse} from "./todolistsApi.types";
import {instance} from "../../../common/instance/instance";

export const todolistsApi = {
    getTodolists() {
        return instance.get<Todolist[]>('todo-lists')
    },
    updateTodolists(payload: { id: string, title: string }) {
        const {title, id} = payload;
        return instance.put<UpdateTodolistResponse>(`todo-lists/${id}`, {title})
    },
    createTodolist(title: string) {
        return instance.post<CreateTodolistResponse>('todo-lists', {title})
    },
    deleteTodolist(id: string) {
        return instance.delete<DeleteTodolistResponse>(`todo-lists/${id}`)
    },
}