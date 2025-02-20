import { v1 } from "uuid"
import type { AppDispatch } from "../../../app/store"
import { tasksApi } from "../api/tasksApi"
import type { DomainTask } from "../api/tasksApi.types"
import { TaskPriority, TaskStatus } from "../lib/enums"
import { addTodolistAC, removeTodolistAC } from "./todolists-reducer"

const initialState: TasksStateType = {}

export type TasksStateType = {
  [key: string]: DomainTask[]
}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
  switch (action.type) {
    case "SET-TASKS": {
      const stateCopy = { ...state }
      stateCopy[action.payload.todolistId] = action.payload.tasks
      return stateCopy
    }

    case "REMOVE-TASK": {
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].filter((t) => t.id !== action.payload.taskId),
      }
    }

    case "ADD-TASK": {
      const newTask: DomainTask = {
        title: action.payload.taskTitle,
        todoListId: action.payload.todolistId,
        startDate: "",
        priority: TaskPriority.Low,
        description: "",
        deadline: "",
        status: TaskStatus.New,
        addedDate: "",
        order: 0,
        id: v1(),
      }
      return {
        ...state,
        [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]],
      }
    }

    case "CHANGE-TASK-STATUS": {
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].map((t) =>
          t.id === action.payload.taskId ? { ...t, isDone: action.payload.newIsDone } : t,
        ),
      }
    }

    case "CHANGE-TASK-TITLE": {
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].map((t) =>
          t.id === action.payload.taskId ? { ...t, title: action.payload.newTaskTitle } : t,
        ),
      }
    }

    case "ADD-TODOLIST": {
      return { ...state, [action.payload.todolistID]: [] }
    }

    case "REMOVE-TODOLIST": {
      const newState = { ...state }
      delete newState[action.payload.id]
      return newState
    }

    default:
      return state
  }
}

// Action creators
export const setTasksAC = (payload: { todolistId: string; tasks: DomainTask[] }) => {
  return { type: "SET-TASKS", payload } as const
}

export const removeTaskAC = (payload: { todolistId: string; taskId: string }) => {
  return { type: "REMOVE-TASK", payload } as const
}

export const addTaskAC = (payload: { taskTitle: string; todolistId: string }) => {
  return { type: "ADD-TASK", payload } as const
}

export const changeTaskStatusAC = (payload: { taskId: string; newIsDone: boolean; todolistId: string }) => {
  return { type: "CHANGE-TASK-STATUS", payload } as const
}

export const changeTaskTitleAC = (payload: { taskId: string; newTaskTitle: string; todolistId: string }) => {
  return { type: "CHANGE-TASK-TITLE", payload } as const
}

// Thunk
// export const fetchTasksThunk = (dispatch: AppDispatch) => {
//   tasksApi.getTasks(todolistId).then((res) => {
//     const tasks = res.data.items
//     dispatch(setTasksAC({ todolistId, tasks }))
//   })
// }

// Use height order components
export const fetchTasksTC = (todolistId: string) => {
  return (dispatch: AppDispatch) => {
    tasksApi.getTasks(todolistId).then((res) => {
      dispatch(setTasksAC({ tasks: res.data.items, todolistId }))
    })
  }
}

export const removeTaskTC = (arg: { todolistId: string; taskId: string }) => {
  return (dispatch: AppDispatch) => {
    tasksApi.deleteTask(arg).then((res) => {
      dispatch(removeTaskAC(arg))
    })
  }
}

// Actions types
export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>
export type SetTasksActionType = ReturnType<typeof setTasksAC>

export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>

type ActionsType =
  | RemoveTaskActionType
  | AddTaskActionType
  | ChangeTaskStatusActionType
  | ChangeTaskTitleActionType
  | SetTasksActionType
  | AddTodolistActionType
  | RemoveTodolistActionType
