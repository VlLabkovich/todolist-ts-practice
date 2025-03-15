import { handleServerAppError } from "common/utils/handleServerAppError"
import { handleServerNetworkError } from "common/utils/handleServerNetworkError"
import { type RequestStatus, setAppStatusAC } from "../../../app/app-reducer"
import type { AppDispatch } from "../../../app/store"
import { todolistsApi } from "../api/todolistsApi"
import type { Todolist } from "../api/todolistsApi.types"
import { ResultCode } from "../lib/enums"

export type FilterValuesType = "all" | "active" | "completed"

export type DomainTodolist = Todolist & {
  filter: FilterValuesType
  entityStatus: RequestStatus
}

// 2 Создание инициализационного стейта
const initialState: DomainTodolist[] = []

// 1 Создание todolistReducer
export const todolistsReducer = (state: DomainTodolist[] = initialState, action: ActionsType): DomainTodolist[] => {
  switch (action.type) {
    case "SET-TODOLISTS": {
      return action.todolists.map((tl) => ({ ...tl, filter: "all", entityStatus: "idle" }))
    }
    case "REMOVE-TODOLIST": {
      return state.filter((el) => el.id !== action.payload.id)
    }
    case "ADD-TODOLIST": {
      const newTodolist: DomainTodolist = {
        id: action.payload.todolist.id,
        title: action.payload.todolist.title,
        filter: "all",
        addedDate: "",
        order: 0,
        entityStatus: "idle",
      }
      return [newTodolist, ...state]
    }
    case "UPDATE-TITLE-TODOLIST": {
      return state.map((el) =>
        el.id === action.payload.id
          ? {
              ...el,
              title: action.payload.title,
            }
          : el,
      )
    }
    case "CHANGE-FILTER-TODOLIST": {
      return state.map((el) =>
        el.id === action.payload.id
          ? {
              ...el,
              filter: action.payload.filter,
            }
          : el,
      )
    }
    case "CHANGE-TODOLIST-ENTITY-STATUS": {
      return state.map((el) =>
        el.id === action.payload.id ? { ...el, entityStatus: action.payload.entityStatus } : el,
      )
    }

    default:
      return state
  }
}

// 4 Создание ActionCreators

export const setTodolistsAC = (todolists: Todolist[]) => {
  return { type: "SET-TODOLISTS", todolists } as const
}
export const removeTodolistAC = (id: string) => {
  return { type: "REMOVE-TODOLIST", payload: { id } } as const
}
export const addTodolistAC = (todolist: DomainTodolist) => {
  return { type: "ADD-TODOLIST", payload: { todolist } } as const
}
export const updateTodolistTitleAC = (payload: { id: string; title: string }) => {
  return { type: "UPDATE-TITLE-TODOLIST", payload } as const
}
export const changeFilterTodolistAC = (payload: { id: string; filter: FilterValuesType }) => {
  return { type: "CHANGE-FILTER-TODOLIST", payload } as const
}
export const changeTodolistEntityStatusAC = (payload: { id: string; entityStatus: RequestStatus }) => {
  return { type: "CHANGE-TODOLIST-ENTITY-STATUS", payload } as const
}

// 5 Thunk
// Use height order components

export const fetchTodolistsTC = () => (dispatch: AppDispatch) => {
  dispatch(setAppStatusAC("loading"))
  todolistsApi
    .getTodolists()
    .then((res) => {
      dispatch(setAppStatusAC("succeeded"))
      dispatch(setTodolistsAC(res.data))
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch)
    })
}
export const addTodolistTC = (title: string) => (dispatch: AppDispatch) => {
  dispatch(setAppStatusAC("loading"))
  todolistsApi
    .createTodolist(title)
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setAppStatusAC("succeeded"))
        const todolist = res.data.data.item
        dispatch(addTodolistAC(todolist))
      } else {
        debugger
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch)
    })
}
export const removeTodolistTC = (id: string) => (dispatch: AppDispatch) => {
  dispatch(setAppStatusAC("loading"))
  dispatch(changeTodolistEntityStatusAC({ id, entityStatus: "loading" }))

  todolistsApi
    .deleteTodolist(id)
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(removeTodolistAC(id))
        dispatch(setAppStatusAC("succeeded"))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch)
      dispatch(changeTodolistEntityStatusAC({ id, entityStatus: "idle" }))
    })
}
export const updateTodolistTitleTC = (arg: { id: string; title: string }) => (dispatch: AppDispatch) => {
  dispatch(setAppStatusAC("loading"))
  todolistsApi
    .updateTodolist(arg)
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setAppStatusAC("succeeded"))
        dispatch(updateTodolistTitleAC(arg))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch)
    })
}

// 3 Типизация actions

export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type UpdateTitleTodolistActionType = ReturnType<typeof updateTodolistTitleAC>
export type ChangeFilterTodolistActionType = ReturnType<typeof changeFilterTodolistAC>
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>
export type ChangeTodolistEntityStatusType = ReturnType<typeof changeTodolistEntityStatusAC>

// 3.1 Объединение типизированных actions в один

type ActionsType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | UpdateTitleTodolistActionType
  | ChangeFilterTodolistActionType
  | SetTodolistsActionType
  | ChangeTodolistEntityStatusType
