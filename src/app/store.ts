import { applyMiddleware, combineReducers, legacy_createStore, type UnknownAction } from "redux"
import { thunk, type ThunkDispatch } from "redux-thunk"
import { tasksReducer } from "../features/todolists/model/tasks-reducer"
import { todolistsReducer } from "../features/todolists/model/todolists-reducer"
import { appReducer } from "./app-reducer"

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
  app: appReducer,
})
// непосредственно создаём store
export const store = legacy_createStore(rootReducer, {}, applyMiddleware(thunk))
// определить автоматически тип всего объекта состояния
export type RootState = ReturnType<typeof store.getState>

// export type AppDispatch = typeof store.dispatch

export type AppDispatch = ThunkDispatch<RootState, unknown, UnknownAction>

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store
