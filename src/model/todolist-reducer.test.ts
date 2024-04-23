import {v1} from "uuid";
import {TodolistType} from "../App";
import {todolistReducer} from "./todolist-reducer";


test('correct todolist should be removed', () => {

    let todolistID1 = v1()
    let todolistID2 = v1()

    const startState: TodolistType[] = [
        {id: todolistID1, title: 'What to learn ?', filter: 'all'},
        {id: todolistID2, title: 'What to buy ?', filter: 'all'}
    ]

    const action = {
        type: "REMOVE-TODOLIST",
        payload: {
            id: todolistID1
        }
    }

    const endState = todolistReducer(startState, action)

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistID2)
})

test('correct todolist should be added', () => {

    let todolistID1 = v1()
    let todolistID2 = v1()

    const startState: TodolistType[] = [
        {id: todolistID1, title: 'What to learn ?', filter: 'all'},
        {id: todolistID2, title: 'What to buy ?', filter: 'all'}
    ]

    const action = {
        type: "ADD_TODOLIST",
        payload: {
            title: 'New todolist'
        }
    }

    const endState = todolistReducer(startState, action)

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(action.payload.title)
})