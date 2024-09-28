import {v1} from "uuid";
import {TodolistType} from "../AppWithReducers";
import {
    addTodolistAC,
    changeFilterTodolistAC,
    changeTitleTodolistAC,
    removeTodolistAC,
    todolistReducer
} from "./todolist-reducer";

let todolistID1 = v1()
let todolistID2 = v1()
let startState: TodolistType[]

beforeEach(() => {
    todolistID1 = v1()
    todolistID2 = v1()

    startState = [
        {id: todolistID1, title: 'What to learn ?', filter: 'all'},
        {id: todolistID2, title: 'What to buy ?', filter: 'all'}
    ]
})

test('correct todolist should be removed', () => {
    const endState = todolistReducer(startState, removeTodolistAC(todolistID1))
    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistID2)
})

test('correct todolist should be added', () => {
    const newTitle = 'New todolist'
    const endState = todolistReducer(startState, addTodolistAC(newTitle))
    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTitle)
})

test('correct todolist should change its name', () => {
    const newTitle = 'New Todolist'
    const endState = todolistReducer(startState,
        changeTitleTodolistAC(todolistID2, newTitle))
    expect(endState[0].title).toBe('What to learn ?')
    expect(endState[1].title).toBe(newTitle)
})

test('correct filter of todolist should be changed', () => {
    const newFilter = 'completed'
    const endState = todolistReducer(startState,
        changeFilterTodolistAC(todolistID2, newFilter))
    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)
})