import {v1} from "uuid";
import {TodolistType} from "../App";
import {
    addTodolistAC,
    changeFilterTodolistAC,
    changeTitleTodolistAC,
    removeTodolistAC,
    todolistReducer
} from "./todolist-reducer";


test('correct todolist should be removed', () => {

    let todolistID1 = v1()
    let todolistID2 = v1()

    const startState: TodolistType[] = [
        {id: todolistID1, title: 'What to learn ?', filter: 'all'},
        {id: todolistID2, title: 'What to buy ?', filter: 'all'}
    ]

    // const action = {
    //     type: 'REMOVE-TODOLIST',
    //     payload: {
    //         id: todolistID1
    //     }
    // } as const

    const endState = todolistReducer(startState, removeTodolistAC(todolistID1))

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

    // const action = {
    //     type: 'ADD-TODOLIST',
    //     payload: {
    //         title: 'New todolist'
    //     }
    // } as const

    const newTitle = 'New todolist'

    const endState = todolistReducer(startState, addTodolistAC(newTitle))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTitle)
})

test('correct todolist should change its name', () => {

    let todolistID1 = v1()
    let todolistID2 = v1()

    const startState: TodolistType[] = [
        {id: todolistID1, title: 'What to learn ?', filter: 'all'},
        {id: todolistID2, title: 'What to buy ?', filter: 'all'}
    ]

    // const action = {
    //     type: 'CHANGE-TITLE-TODOLIST',
    //     payload: {
    //         id: todolistID2,
    //         title: 'New todolist'
    //     }
    // } as const

    const newTitle = 'New Todolist'

    const endState = todolistReducer(startState,
        changeTitleTodolistAC(todolistID2, newTitle))

    expect(endState[0].title).toBe('What to learn ?')
    expect(endState[1].title).toBe(newTitle)
})

test('correct filter of todolist should be changed', () => {
    let todolistID1 = v1()
    let todolistID2 = v1()

    const startState: TodolistType[] = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ]

    // const action = {
    //     type: 'CHANGE-FILTER-TODOLIST',
    //     payload: {
    //         id: todolistID2,
    //         filter: 'completed',
    //     },
    // } as const

    const newFilter = 'completed'

    const endState = todolistReducer(startState,
        changeFilterTodolistAC(todolistID2, newFilter))

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)
})