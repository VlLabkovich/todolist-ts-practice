import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './tasks-reducer'
import {TasksStateType} from '../App'

test('correct task should be deleted from correct array', () => {
    const startState: TasksStateType = {
        todolistID1: [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false},
        ],
        todolistID2: [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false},
        ],
    }

    const endState = tasksReducer(
        startState,
        removeTaskAC({
            taskID: '2',
            todolistID: 'todolistID2',
        })
    )

    expect(endState).toEqual({
        todolistID1: [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false},
        ],
        todolistID2: [
            {id: '1', title: 'bread', isDone: false},
            {id: '3', title: 'tea', isDone: false},
        ],
    })
})

test('correct task should be added to correct array', () => {
    const startState: TasksStateType = {
        todolistID1: [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false},
        ],
        todolistID2: [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false},
        ],
    }

    const endState = tasksReducer(startState,
        addTaskAC(
            {
                title: 'juce',
                todolistID: 'todolistID2'
            }))

    expect(endState['todolistID1'].length).toBe(3)
    expect(endState['todolistID2'].length).toBe(4)
    expect(endState['todolistID2'][0].id).toBeDefined()
    expect(endState['todolistID2'][0].title).toBe('juce')
    expect(endState['todolistID2'][0].isDone).toBe(false)
})

test('status of specified task should be changed', () => {
    const startState: TasksStateType = {
        todolistID1: [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false},
        ],
        todolistID2: [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false},
        ],
    }

    const endState = tasksReducer(
        startState,
        changeTaskStatusAC({
            taskID: '2',
            isDone: false,
            todolistID: 'todolistID2',
        })
    )

    expect(endState['todolistID2'][1].isDone).toBe(false)
    expect(endState['todolistID1'][1].isDone).toBe(true)
})

test('title of specified task should be changed', () => {
    const startState: TasksStateType = {
        todolistID1: [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false},
        ],
        todolistID2: [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false},
        ],
    }

    const endState = tasksReducer(
        startState,
        changeTaskTitleAC({
            taskID: '2',
            title: 'newTitle',
            todolistID: 'todolistID2',
        })
    )

    expect(endState['todolistID2'][1].title).toBe('newTitle')
    expect(endState['todolistID1'][1].title).toBe('JS')
})