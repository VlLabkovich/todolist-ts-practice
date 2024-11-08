import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
// 2 Создание инициализационного стейта
const initialState: TodolistType[] = []

// 1 Создание todolistReducer
export const todolistsReducer = (state: TodolistType[] = initialState, action: ActionsType): TodolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(el => el.id !== action.payload.todolistId)
        }
        case 'ADD-TODOLIST': {
            // const todolistId = v1()
            const newTodolist: TodolistType = {
                id: action.payload.todolistID,
                title: action.payload.newTitle,
                filter: 'all'
            }
            return [newTodolist, ...state]
        }
        case 'CHANGE-TITLE-TODOLIST': {
            return state.map(el => el.id === action.payload.todolistId ? {
                ...el,
                title: action.payload.newTodolistTitle
            } : el)
        }
        case 'CHANGE-FILTER-TODOLIST': {
            return state.map(el => el.id === action.payload.todolistId ? {
                ...el,
                filter: action.payload.value
            } : el)
        }
        default:
            return state
    }
}

// 4 Создание ActionCreators
export const removeTodolistAC = (todolistId: string) => {
    return {type: 'REMOVE-TODOLIST', payload: {todolistId}} as const
}

export const addTodolistAC = (newTitle: string) => {
    return {type: 'ADD-TODOLIST', payload: {newTitle, todolistID: v1()}} as const
}

export const changeTitleTodolistAC = (payload: { todolistId: string, newTodolistTitle: string }) => {
    return {type: 'CHANGE-TITLE-TODOLIST', payload} as const
}

export const changeFilterTodolistAC = (payload: { todolistId: string, value: FilterValuesType }) => {
    return {type: 'CHANGE-FILTER-TODOLIST', payload} as const
}

// 3 Типизация actions
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type ChangeTitleTodolistActionType = ReturnType<typeof changeTitleTodolistAC>
export type ChangeFilterTodolistActionType = ReturnType<typeof changeFilterTodolistAC>

// 3.1 Объединение типизированных actions в один
type ActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTitleTodolistActionType
    | ChangeFilterTodolistActionType