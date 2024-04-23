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
        type: 'REMOVE-TODOLIST',
        payload: {
            id: todolistID1
        }
    } as const

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
        type: 'ADD-TODOLIST',
        payload: {
            title: 'New todolist'
        }
    } as const

    const endState = todolistReducer(startState, action)

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(action.payload.title)
})

test('correct todolist should change its name', () => {

    let todolistID1 = v1()
    let todolistID2 = v1()

    const startState: TodolistType[] = [
        {id: todolistID1, title: 'What to learn ?', filter: 'all'},
        {id: todolistID2, title: 'What to buy ?', filter: 'all'}
    ]

    const action = {
        type: 'CHANGE-TITLE-TODOLIST',
        payload: {
            id: todolistID2,
            title: 'New todolist'
        }
    } as const

    const endState = todolistReducer(startState, action)

    expect(endState[0].title).toBe('What to learn ?')
    expect(endState[1].title).toBe(action.payload.title)
})

test('correct filter of todolist should be changed', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: TodolistType[] = [
        { id: todolistId1, title: 'What to learn', filter: 'all' },
        { id: todolistId2, title: 'What to buy', filter: 'all' },
    ]

    const action = {
        type: 'CHANGE-FILTER-TODOLIST',
        payload: {
            id: todolistId2,
            filter: 'completed',
        },
    } as const

    const endState = todolistReducer(startState, action)

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(action.payload.filter)
})