import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from "uuid";
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


export type FilterValuesType = "all" | "active" | "completed";

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksStateType = {
    [key: string]: TaskType[]
}

type ThemeMode = 'dark' | 'light'

function App() {

    const [themeMode, setThemeMode] = useState<ThemeMode>('light')

    const theme = createTheme({
        palette: {
            mode: themeMode === 'light' ? 'light' : 'dark',
            primary: {
                main: '#2d467c',
            },
        },
    })

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistID1, title: 'What to learn ?', filter: 'all'},
        {id: todolistID2, title: 'What to buy ?', filter: 'all'}
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistID1]: [
            {id: v1(), title: 'Html & Css', isDone: true},
            {id: v1(), title: 'JavaScript', isDone: false},
            {id: v1(), title: 'ReactJS', isDone: true}
        ],
        [todolistID2]: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Bread', isDone: false},
            {id: v1(), title: 'Potato', isDone: false}
        ],
    })

    function removeTask(taskId: string, todolistId: string) {
        setTasks({
            ...tasks,
            [todolistId]:
                tasks[todolistId].filter(el => el.id !== taskId)
        })
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {

        setTodolists(todolists.map(el => el.id === todolistId ? {...el, filter: value} : el))
    }

    const addTaskHandler = (taskTitle: string, todolistId: string) => {
        let newTask = {id: v1(), title: taskTitle, isDone: false}
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    }

    const changeTasksStatus = (taskId: string, newIsDone: boolean, todolistId: string) => {

        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(el => el.id === taskId ? {...el, isDone: newIsDone} : el)
        })
    }

    const removeHandlerTodolist = (todolistId: string) => {
        // сетаем оставшийся тудулист
        setTodolists(todolists.filter(el => el.id !== todolistId))
        // удаляем из стейта таски относящиеся к удалённому тудулисту
        delete tasks[todolistId]
        // сетаем(обновляем) изменённую копию объекта в стейт
        setTasks({...tasks})
    }

    const addTodolist = (todolistTitle: string) => {
        const todolistId = v1()
        const newTodolist: TodolistType = {id: todolistId, title: todolistTitle, filter: 'all'}
        setTodolists([newTodolist, ...todolists])
        setTasks({...tasks, [todolistId]: []})
    }

    const updateTaskHandler = (newTaskTitle: string, todolistId: string, taskId: string) => {
        setTasks({
            ...tasks,
            [todolistId]:
                tasks[todolistId].map(el => el.id === taskId ? {...el, title: newTaskTitle} : el)
        })
    }

    const updateTodolistHandler = (todolistId: string, newTodolistTitle: string) => {
        setTodolists(todolists.map(el => el.id === todolistId ? {...el, title: newTodolistTitle} : el))
    }

    const changeModeHandler = () => {
        setThemeMode(themeMode == 'light' ? 'dark' : 'light')
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
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
                        <Switch color={'default'} onChange={changeModeHandler} />
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
                            <Grid>
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
                                        removeTodolist={removeHandlerTodolist}
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

export default App;
