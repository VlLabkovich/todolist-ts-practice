import { useAppSelector } from "common/hooks"
import { getTheme } from "common/theme"
import React from "react"
import { ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { Main } from "./Main"
import { selectThemeMode } from "./appSelectors"
import { Header } from "common/components"

export const App = () => {
  const themeMode = useAppSelector(selectThemeMode)

  return (
    <ThemeProvider theme={getTheme(themeMode)}>
      <CssBaseline />
      <Header />
      <Main />
    </ThemeProvider>
  )
}
