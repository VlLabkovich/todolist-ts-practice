import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

// 3.1 Объединение типизированных actions в один
type ActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTitleTodolistActionType
    | ChangeFilterTodolistActionType

// 3 Типизация actions
export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    payload: {
        id: string
    }
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    payload: {
        newTitle: string
    }
}
export type ChangeTitleTodolistActionType = {
    type: 'CHANGE-TITLE-TODOLIST'
    payload: {
        id: string
        title: string
    }
}
export type ChangeFilterTodolistActionType = {
    type: 'CHANGE-FILTER-TODOLIST'
    payload: {
        id: string
        filter: FilterValuesType
    }
}

let todolistID1 = v1()
let todolistID2 = v1()

// 2 Создание инициализационного стейта
const initialState: TodolistType[] = [
    {id: todolistID1, title: 'What to learn ?', filter: 'all'},
    {id: todolistID2, title: 'What to buy ?', filter: 'all'}
]
// 1 Создание todolistReducer
export const todolistReducer = (state: TodolistType[] = initialState, action: ActionsType) : TodolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(el => el.id !== action.payload.id)
        }
        case 'ADD-TODOLIST': {
            const todolistId = v1()
            const newTodolist: TodolistType = {id: todolistId, title: action.payload.newTitle, filter: 'all'}
            return [newTodolist, ...state]
        }
        case 'CHANGE-TITLE-TODOLIST': {
            return state.map(el => el.id === action.payload.id ? {...el, title: action.payload.title} : el)
        }
        case 'CHANGE-FILTER-TODOLIST': {
            return state.map(el => el.id === action.payload.id ? {...el, filter: action.payload.filter} : el)
        }
        default:
            return state
    }
}

// 4 Создание ActionCreators
export const removeTodolistAC = (todolistID1: string): RemoveTodolistActionType => {
    return (
        {
            type: 'REMOVE-TODOLIST',
            payload: {id: todolistID1}
        } as const
    )

}

export const addTodolistAC = (newTitle: string): AddTodolistActionType => {
    return (
        {
            type: 'ADD-TODOLIST',
            payload: {newTitle}
        } as const
    )
}

export const changeTitleTodolistAC = (todolistID2: string,newTitle: string ): ChangeTitleTodolistActionType => {
    return (
        {
            type: 'CHANGE-TITLE-TODOLIST',
            payload: {
                id: todolistID2,
                title: newTitle
            }
        } as const
    )
}

export const changeFilterTodolistAC = (todolistID2: string, newFilter: FilterValuesType) => {
    return (
        {
            type: 'CHANGE-FILTER-TODOLIST',
            payload: {
                id: todolistID2,
                filter: newFilter
            }
        } as const
    )
}