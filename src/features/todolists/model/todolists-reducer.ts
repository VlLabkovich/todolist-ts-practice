import type { Dispatch } from "redux"
import type { AppDispatch } from "../../../app/store"
import { todolistsApi } from "../api/todolistsApi"
import type { Todolist } from "../api/todolistsApi.types"

export type FilterValuesType = "all" | "active" | "completed"

export type DomainTodolist = Todolist & { filter: FilterValuesType }

// 2 Создание инициализационного стейта
const initialState: DomainTodolist[] = []

// 1 Создание todolistReducer
export const todolistsReducer = (state: DomainTodolist[] = initialState, action: ActionsType): DomainTodolist[] => {
  switch (action.type) {
    case "SET-TODOLISTS": {
      return action.todolists.map((tl) => ({ ...tl, filter: "all" }))
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
      }
      return [newTodolist, ...state]
    }
    case "CHANGE-TITLE-TODOLIST": {
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
  return { type: "CHANGE-TITLE-TODOLIST", payload } as const
}

export const changeFilterTodolistAC = (payload: { id: string; filter: FilterValuesType }) => {
  return { type: "CHANGE-FILTER-TODOLIST", payload } as const
}

// 5 Thunk
// Use height order components
export const fetchTodolistsTC = () => {
  return (dispatch: AppDispatch) => {
    todolistsApi.getTodolists().then((res) => {
      dispatch(setTodolistsAC(res.data))
    })
  }
}

export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
  todolistsApi.createTodolist(title).then((res) => {
    const todolist = res.data.data.item
    dispatch(addTodolistAC(todolist))
  })
}

export const removeTodolistTC = (id: string) => (dispatch: Dispatch) => {
  todolistsApi.deleteTodolist(id).then((res) => {
    dispatch(removeTodolistAC(id))
  })
}

export const updateTodolistTitleTC = (arg: { id: string; title: string }) => (dispatch: Dispatch) => {
  todolistsApi.updateTodolist(arg).then((res) => {
    dispatch(updateTodolistTitleAC(arg))
  })
}

// 3 Типизация actions
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type UpdateTitleTodolistActionType = ReturnType<typeof updateTodolistTitleAC>
export type ChangeFilterTodolistActionType = ReturnType<typeof changeFilterTodolistAC>
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>

// 3.1 Объединение типизированных actions в один
type ActionsType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | UpdateTitleTodolistActionType
  | ChangeFilterTodolistActionType
  | SetTodolistsActionType
