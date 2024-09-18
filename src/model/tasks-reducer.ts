import {TasksStateType} from "../App";
import {v1} from "uuid";

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            return {
                ...state,
                [action.payload.todolistID]:
                    state[action.payload.todolistID].filter(t => t.id !== action.payload.taskID)
            }
        }

        case "ADD-TASK": {
            const newTaskID = v1()
            const newTask = {id: newTaskID, title: action.payload.title, isDone: false}
            return {
                ...state,
                [action.payload.todolistID]: [newTask, ...state[action.payload.todolistID]]
            }
        }

        case "CHANGE-TASK-STATUS": {

            return {
                ...state,
                [action.payload.todolistID]: state[action.payload.todolistID].map(t =>
                    t.id === action.payload.taskID ? {...t, isDone: action.payload.isDone} : t)
            }
        }

        case "CHANGE-TASK-TITLE": {

            return {
                ...state,
                [action.payload.todolistID]:
                            state[action.payload.todolistID].map(
                                t => t.id === action.payload.taskID ?
                                    {...t, title: action.payload.title} : t
                            )
            }
        }

        default:
            throw new Error("I don't understand this type")
    }
}

// Action creators
export const removeTaskAC = (payload: { todolistID: string, taskID: string }) => {
    return {type: 'REMOVE-TASK', payload} as const
}

export const addTaskAC = (payload: { title: string, todolistID: string }) => {
    return {type: 'ADD-TASK', payload} as const
}

export const changeTaskStatusAC = (payload: {
    taskID: string,
    isDone: boolean,
    todolistID: string
}) => {
    return {type: 'CHANGE-TASK-STATUS', payload} as const
}

export const changeTaskTitleAC = (payload: {
    taskID: string,
    title: string,
    todolistID: string
}) => {
    return {type: 'CHANGE-TASK-TITLE', payload} as const
}

// Actions types
export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>

type ActionsType = RemoveTaskActionType |
    AddTaskActionType |
    ChangeTaskStatusActionType |
    ChangeTaskTitleActionType