import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";
import Container from '@mui/material/Container'
import Grid from '@mui/material/Unstable_Grid2'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Paper from '@mui/material/Paper';
import {MenuButton} from "./components/MenuButton";

export type FilterValuesType = "all" | "active" | "completed";

type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksStateType = {
    [key: string]: TaskType[]
}

function App() {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'active'}
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistID1]: [
            {id: v1(), title: 'HTML & CSS', isDone: true},
            {id: v1(), title: 'JAVASCRIPT', isDone: false},
            {id: v1(), title: 'REACTJS', isDone: true}
        ],
        [todolistID2]: [
            {id: v1(), title: 'REST API', isDone: true},
            {id: v1(), title: 'GRAPHQL', isDone: false}
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

    const addTaskHandler = (title: string, todolistId: string) => {
        let newTask = {id: v1(), title, isDone: false}
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

    const addTodolist = (taskTitle: string) => {
        const todolistId = v1()
        const newTodolist: TodolistType = {id: todolistId, title: taskTitle, filter: 'all'}
        setTodolists([newTodolist, ...todolists])
        setTasks({...tasks, [todolistId]: []})
    }

    const updateTaskHandler = (newTitle: string, todolistId: string, taskId: string) => {
        setTasks({
            ...tasks,
            [todolistId]:
                tasks[todolistId].map(el => el.id === taskId ? {...el, title: newTitle} : el)
        })
    }

    const updateTodolistHandler = (todolistId: string, newTitle: string) => {
        setTodolists(todolists.map(el => el.id === todolistId ? {...el, title: newTitle} : el))
    }

    return (
        <div className="App">

            <AppBar position="static"
                    sx={{marginBottom: '30px'}}
            >
                <Toolbar  sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <IconButton color="inherit">
                        <MenuIcon/>
                    </IconButton>
                    <div>
                        <MenuButton>Login</MenuButton>
                        <MenuButton>Logout</MenuButton>
                        <MenuButton>Faq</MenuButton>
                    </div>
                </Toolbar>
            </AppBar>

            <Container fixed>
                <Grid container
                      sx={{marginBottom: '30px'}}
                >
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
        </div>
    );
}

export default App;
