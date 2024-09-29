import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './components/Todolist';
import {AddItemForm} from "./components/AddItemForm";
import Container from '@mui/material/Container'
import Grid from '@mui/material/Unstable_Grid2'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Paper from '@mui/material/Paper';
import {MenuButton} from "./components/MenuButton";
import {createTheme, ThemeProvider} from '@mui/material/styles'
import Switch from '@mui/material/Switch'
import CssBaseline from '@mui/material/CssBaseline'
import {
    addTodolistAC,
    changeFilterTodolistAC,
    changeTitleTodolistAC,
    removeTodolistAC,
} from "./model/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./model/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./app/store";

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: TaskType[]
}

type ThemeMode = 'dark' | 'light'

//
// let todolistID1 = v1()
// let todolistID2 = v1()
//
// let [todolists, dispatchToTodolistsReducer] = useReducer(todolistsReducer, [
//     {id: todolistID1, title: 'What to learn ?', filter: 'all'},
//     {id: todolistID2, title: 'What to buy ?', filter: 'all'}
// ])
//
// let [tasks, dispatchToTasksReducer] = useReducer(tasksReducer, {
//     [todolistID1]: [
//         {id: v1(), title: 'Html & Css', isDone: true},
//         {id: v1(), title: 'JavaScript', isDone: false},
//         {id: v1(), title: 'ReactJS', isDone: true}
//     ],
//     [todolistID2]: [
//         {id: v1(), title: 'Milk', isDone: true},
//         {id: v1(), title: 'Bread', isDone: false},
//         {id: v1(), title: 'Potato', isDone: false}
//     ],
// })

function AppWithRedux() {

    const dispatch = useDispatch()

    const todolists = useSelector<RootState, TodolistType[]>(state => state.todolists)
    const tasks = useSelector<RootState, TasksStateType>(state => state.tasks)

    const [themeMode, setThemeMode] = useState<ThemeMode>('light')

    const theme = createTheme({
        palette: {
            mode: themeMode === 'light' ? 'light' : 'dark',
            primary: {
                main: '#2d467c',
            },
        },
    })

    function removeTask(taskId: string, todolistId: string) {
        dispatch(removeTaskAC({todolistId, taskId}))
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        dispatch(changeFilterTodolistAC(todolistId, value))
    }

    const addTaskHandler = (taskTitle: string, todolistId: string) => {
        dispatch(addTaskAC({taskTitle, todolistId}))
    }

    const changeTasksStatus = (taskId: string, newIsDone: boolean, todolistId: string) => {
        dispatch(changeTaskStatusAC({taskId, newIsDone, todolistId}))
    }

    const removeTodolist = (todolistId: string) => {
        dispatch(removeTodolistAC(todolistId))
    }

    const addTodolist = (todolistTitle: string) => {
        dispatch(addTodolistAC(todolistTitle))
    }

    const updateTaskHandler = (newTaskTitle: string, todolistId: string, taskId: string) => {
        dispatch(changeTaskTitleAC({newTaskTitle, todolistId, taskId}))
    }

    const updateTodolistHandler = (todolistId: string, newTodolistTitle: string) => {
        dispatch(changeTitleTodolistAC(todolistId, newTodolistTitle))
    }

    const changeModeHandler = () => {
        setThemeMode(themeMode == 'light' ? 'dark' : 'light')
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <AppBar position="static"
                    sx={{marginBottom: '30px'}}>
                <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <IconButton color="inherit">
                        <MenuIcon/>
                    </IconButton>
                    <div>
                        <MenuButton>Login</MenuButton>
                        <MenuButton>Logout</MenuButton>
                        <MenuButton background={theme.palette.primary.dark}>Faq</MenuButton>
                        <Switch color={'default'} onChange={changeModeHandler}/>
                    </div>
                </Toolbar>
            </AppBar>


            <Container fixed>
                <Grid container
                      sx={{marginBottom: '30px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={4}>
                    {todolists.map(el => {

                        const allTodolistTasks = tasks[el.id]

                        let tasksForTodolist = allTodolistTasks

                        if (el.filter === "active") {
                            tasksForTodolist = allTodolistTasks.filter(t => !t.isDone);
                        }
                        if (el.filter === "completed") {
                            tasksForTodolist = allTodolistTasks.filter(t => t.isDone);
                        }

                        return (
                            <Grid key={el.id}>
                                <Paper elevation={2}
                                       sx={{padding: '0 20px 20px 20px'}}>
                                    <Todolist
                                        key={el.id}
                                        todolistId={el.id}
                                        title={el.title}
                                        tasks={tasksForTodolist}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTaskHandler}
                                        changeTaskStatus={changeTasksStatus}
                                        filter={el.filter}
                                        removeTodolist={removeTodolist}
                                        updateTaskTitle={updateTaskHandler}
                                        updateTodolistTitle={updateTodolistHandler}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </ThemeProvider>
    )
}

export default AppWithRedux;