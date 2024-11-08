import React from 'react';
import './App.css';
import {ThemeProvider} from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import {useSelector} from "react-redux";
import {RootState} from "./store";
import {getTheme} from "../common/theme/theme";
import {Header} from "../Header";
import {Main} from "../Main";

type ThemeMode = 'dark' | 'light'

export  const App = () => {
    const themeMode = useSelector<RootState, ThemeMode>(state => state.themeMode.themeMode)

    return (
        <ThemeProvider theme={getTheme(themeMode)}>
            <CssBaseline/>
            <Header/>
            <Main/>
        </ThemeProvider>
    )
}