import type { Dispatch } from "redux"
import type { AppDispatch, RootState } from "../../../app/store"
import { tasksApi } from "../api/tasksApi"
import type { DomainTask, UpdateTaskDomainModel } from "../api/tasksApi.types"
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
      const newTask = action.payload.task
      return {
        ...state,
        [newTask.todoListId]: [newTask, ...state[newTask.todoListId]],
      }
    }

    case "UPDATE-TASK": {
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].map((t) =>
          t.id === action.payload.taskId ? { ...t, ...action.payload.domainModel } : t,
        ),
      }
    }

    case "ADD-TODOLIST": {
      return { ...state, [action.payload.todolist.id]: [] }
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

export const addTaskAC = (payload: { task: DomainTask }) => {
  return { type: "ADD-TASK", payload } as const
}

export const updateTaskAC = (payload: { taskId: string; todolistId: string; domainModel: UpdateTaskDomainModel }) => {
  return { type: "UPDATE-TASK", payload } as const
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
export const addTaskTC = (arg: { title: string; todolistId: string }) => {
  return (dispatch: Dispatch) => {
    tasksApi.createTask(arg).then((res) => {
      dispatch(addTaskAC({ task: res.data.data.item }))
    })
  }
}

export const updateTaskTC =
  (arg: { taskId: string; todolistId: string; domainModel: UpdateTaskDomainModel }) =>
  (dispatch: Dispatch, getState: () => RootState) => {
    const { taskId, todolistId, domainModel } = arg

    const allTasksFromState = getState().tasks
    const tasksForCurrentTodolist = allTasksFromState[todolistId]
    const task = tasksForCurrentTodolist.find((t) => t.id === taskId)

    if (task) {
      const model: UpdateTaskDomainModel = {
        status: task.status,
        title: task.title,
        deadline: task.deadline,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
        ...domainModel,
      }

      tasksApi.updateTask({ taskId, model, todolistId }).then((res) => {
        if (res.data.resultCode === 0) {
          dispatch(updateTaskAC(arg))
          // console.log("Updated state:", getState().tasks)
          // console.log("Updating with:", domainModel)
        }
      })
    }
  }
// Actions types
export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type UpdateTaskActionType = ReturnType<typeof updateTaskAC>
export type SetTasksActionType = ReturnType<typeof setTasksAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>

type ActionsType =
  | RemoveTaskActionType
  | AddTaskActionType
  | UpdateTaskActionType
  | SetTasksActionType
  | AddTodolistActionType
  | RemoveTodolistActionType
