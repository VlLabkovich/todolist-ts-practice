import { useAppDispatch, useAppSelector } from "common/hooks"
import { getTheme } from "common/theme"
import React, { useEffect } from "react"
import { ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { fetchTodolistsThunk } from "../features/todolists/model/todolists-reducer"
import { Main } from "./Main"
import { selectThemeMode } from "./appSelectors"
import { Header } from "common/components"

export const App = () => {
  const themeMode = useAppSelector(selectThemeMode)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchTodolistsThunk)
  }, [])

  return (
    <ThemeProvider theme={getTheme(themeMode)}>
      <CssBaseline />
      <Header />
      <Main />
    </ThemeProvider>
  )
}
