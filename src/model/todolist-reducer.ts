import {TodolistType} from "../App";
import {v1} from "uuid";

type actionType = {
    type: string
    payload: any
}

const todolistID1 = v1()
const todolistID2 = v1()

const initialState: TodolistType[]= [
    {id: todolistID1, title: 'What to learn ?', filter: 'all'},
    {id: todolistID2, title: 'What to buy ?', filter: 'all'}
]

export const todolistReducer = (state: TodolistType[] = initialState , action: actionType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state
        }
        case 'ADD_TODOLIST': {
            return state
        }
        default: return state
    }
}