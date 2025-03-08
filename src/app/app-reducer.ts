export type ThemeMode = "dark" | "light"
export type RequestStatus = "idle" | "loading" | "succeeded" | "failed"

type InitialState = typeof initialState

const initialState = {
  themeMode: "light" as ThemeMode,
  status: "idle" as RequestStatus,
}

export const appReducer = (state: InitialState = initialState, action: ActionsType): InitialState => {
  switch (action.type) {
    case "CHANGE-THEME":
      return { ...state, themeMode: action.themeMode }

    case "SET_STATUS":
      return { ...state, status: action.payload.status }

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

export const changeThemeAC = (themeMode: ThemeMode) => {
  return { type: "CHANGE-THEME", themeMode } as const
}

export type ChangeThemeActionType = ReturnType<typeof changeThemeAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>

// Action types
type ActionsType = ChangeThemeActionType | SetAppStatusActionType
