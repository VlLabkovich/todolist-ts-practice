import {FilterValuesType, TodolistType} from "../AppWithReducers";
import {v1} from "uuid";

let todolistID1 = v1()
let todolistID2 = v1()

// 2 Создание инициализационного стейта
const initialState: TodolistType[] = [
    {id: todolistID1, title: 'What to learn ?', filter: 'all'},
    {id: todolistID2, title: 'What to buy ?', filter: 'all'}
]
// 1 Создание todolistReducer
export const todolistReducer = (state: TodolistType[] = initialState, action: ActionsType): TodolistType[] => {
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
            return state.map(el => el.id === action.payload.todolistId2 ? {...el, title: action.payload.newTitle} : el)
        }
        case 'CHANGE-FILTER-TODOLIST': {
            return state.map(el => el.id === action.payload.todolistId2 ? {
                ...el,
                filter: action.payload.newFilter
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

export const changeTitleTodolistAC = (todolistId2: string, newTitle: string) => {
    return {type: 'CHANGE-TITLE-TODOLIST', payload: {todolistId2, newTitle}} as const
}

export const changeFilterTodolistAC = (todolistId2: string, newFilter: FilterValuesType) => {
    return {type: 'CHANGE-FILTER-TODOLIST', payload: {todolistId2, newFilter}} as const
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