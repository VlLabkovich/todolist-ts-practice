import {v1} from "uuid";
import {addTodolistAC, removeTodolistAC} from "./todolists-reducer";

const initialState: TasksStateType = {}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TasksStateType = {
    [key: string]: TaskType[]
}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            return {
                ...state,
                [action.payload.todolistId]:
                    state[action.payload.todolistId].filter(t => t.id !== action.payload.taskId)
            }
        }

        case "ADD-TASK": {
            const newTaskID = v1()
            const newTask = {id: newTaskID, title: action.payload.taskTitle, isDone: false}
            return {
                ...state,
                [action.payload.id]: [newTask, ...state[action.payload.id]]
            }
        }

        case "CHANGE-TASK-STATUS": {

            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(t =>
                    t.id === action.payload.taskId ? {...t, isDone: action.payload.newIsDone} : t)
            }
        }

        case "CHANGE-TASK-TITLE": {

            return {
                ...state,
                [action.payload.todolistId]:
                    state[action.payload.todolistId].map(
                        t => t.id === action.payload.taskId ?
                            {...t, title: action.payload.newTaskTitle} : t
                    )
            }
        }

        case "ADD-TODOLIST": {

            return {...state, [action.payload.todolistID]: []}
        }

        case "REMOVE-TODOLIST": {
            const newState = {...state}
            delete newState[action.payload.id]
            return newState
        }

        default:
            return state
    }
}

// Action creators
export const removeTaskAC = (payload: { todolistId: string, taskId: string }) => {
    return {type: 'REMOVE-TASK', payload} as const
}

export const addTaskAC = (payload: { taskTitle: string, id: string }) => {
    return {type: 'ADD-TASK', payload} as const
}

export const changeTaskStatusAC = (payload: {
    taskId: string,
    newIsDone: boolean,
    todolistId: string
}) => {
    return {type: 'CHANGE-TASK-STATUS', payload} as const
}

export const changeTaskTitleAC = (payload: {
    taskId: string,
    newTaskTitle: string,
    todolistId: string
}) => {
    return {type: 'CHANGE-TASK-TITLE', payload} as const
}

// Actions types
export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>

export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>


type ActionsType = RemoveTaskActionType |
    AddTaskActionType |
    ChangeTaskStatusActionType |
    ChangeTaskTitleActionType |
    AddTodolistActionType |
    RemoveTodolistActionType