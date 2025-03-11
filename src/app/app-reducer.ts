export type ThemeMode = "dark" | "light"
export type RequestStatus = "idle" | "loading" | "succeeded" | "failed"
export type ErrorStatus = string | null

type InitialState = typeof initialState

const initialState = {
  themeMode: "light" as ThemeMode,
  status: "idle" as RequestStatus,
  error: null as ErrorStatus,
}

export const appReducer = (state: InitialState = initialState, action: ActionsType): InitialState => {
  switch (action.type) {
    case "CHANGE-THEME":
      return { ...state, themeMode: action.themeMode }

    case "SET_STATUS":
      return { ...state, status: action.payload.status }

    case "SET-ERROR":
      return { ...state, error: action.payload.error }

    default:
      return state
  }
}

export const setAppStatusAC = (status: RequestStatus) => {
  return {
    type: "SET_STATUS",
    payload: { status },
  } as const
}

export const setAppErrorAC = (error: ErrorStatus) => {
  return {
    type: "SET-ERROR",
    payload: { error },
  } as const
}

export const changeThemeAC = (themeMode: ThemeMode) => {
  return { type: "CHANGE-THEME", themeMode } as const
}

export type ChangeThemeActionType = ReturnType<typeof changeThemeAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>

// Action types
type ActionsType = ChangeThemeActionType | SetAppStatusActionType | SetAppErrorActionType
