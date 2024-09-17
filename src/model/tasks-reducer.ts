import {TasksStateType} from "../App";

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {
                ...state,
                [action.payload.todolistID]:
                    state[action.payload.todolistID].filter(t => t.id !== action.payload.taskID)
            }
        }

        default:
            throw new Error("I don't understand this type")
    }
}

// Action creators
export const removeTaskAC = (payload:{todolistID: string, taskID: string}) => {
    return {type: 'REMOVE-TASK', payload} as const
}

// Actions types
export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>

type ActionsType = RemoveTaskActionType