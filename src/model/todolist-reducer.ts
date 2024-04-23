import {TodolistType} from "../App";
import {v1} from "uuid";

type actionType = {
    type: string
    payload: any
}

let todolistID1 = v1()
let todolistID2 = v1()

const initialState: TodolistType[]= [
    {id: todolistID1, title: 'What to learn ?', filter: 'all'},
    {id: todolistID2, title: 'What to buy ?', filter: 'all'}
]

export const todolistReducer = (state: TodolistType[] = initialState , action: actionType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(el => el.id !== action.payload.id)
        }
        case 'ADD-TODOLIST': {
            const todolistId = v1()
            const newTodolist: TodolistType = {id: todolistId, title: action.payload.title, filter: 'all'}
            return [newTodolist, ...state]
        }
        case 'CHANGE-TITLE-TODOLIST': {
            return state.map(el => el.id === action.payload.id ? {...el, title: action.payload.title} : el)
        }
        case 'CHANGE-FILTER-TODOLIST': {
            return state.map(el => el.id === action.payload.id ? {...el, filter: action.payload.filter} : el)
        }
        default: return state
    }
}