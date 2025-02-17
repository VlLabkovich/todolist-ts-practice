import { v1 } from "uuid"
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
        id: action.payload.todolistID,
        title: action.payload.newTitle,
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
              title: action.payload.newTodolistTitle,
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

export const addTodolistAC = (newTitle: string) => {
  return { type: "ADD-TODOLIST", payload: { newTitle, todolistID: v1() } } as const
}

export const changeTitleTodolistAC = (payload: { id: string; newTodolistTitle: string }) => {
  return { type: "CHANGE-TITLE-TODOLIST", payload } as const
}

export const changeFilterTodolistAC = (payload: { id: string; filter: FilterValuesType }) => {
  return { type: "CHANGE-FILTER-TODOLIST", payload } as const
}

// 5 Thunk
export const fetchTodolistsTC = () => (dispatch: AppDispatch) => {
  todolistsApi.getTodolists().then((res) => {
    dispatch(setTodolistsAC(res.data))
  })
}

// 3 Типизация actions
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type ChangeTitleTodolistActionType = ReturnType<typeof changeTitleTodolistAC>
export type ChangeFilterTodolistActionType = ReturnType<typeof changeFilterTodolistAC>
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>

// 3.1 Объединение типизированных actions в один
type ActionsType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTitleTodolistActionType
  | ChangeFilterTodolistActionType
  | SetTodolistsActionType
