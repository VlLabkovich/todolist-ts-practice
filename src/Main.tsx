import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./app/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, TasksStateType} from "./model/tasks-reducer";
import {
    addTodolistAC,
    changeFilterTodolistAC,
    changeTitleTodolistAC, FilterValuesType,
    removeTodolistAC, TodolistType
} from "./model/todolists-reducer";
import {AddItemForm} from "./components/AddItemForm";
import Grid from "@mui/material/Unstable_Grid2";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import {Todolist} from "./components/Todolist";

const Main = () => {
    const dispatch = useDispatch()

    const todolists = useSelector<RootState, TodolistType[]>(state => state.todolists)
    const tasks = useSelector<RootState, TasksStateType>(state => state.tasks)

    function removeTask(taskId: string, todolistId: string) {
        dispatch(removeTaskAC({todolistId, taskId}))
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        dispatch(changeFilterTodolistAC({todolistId, value}))
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
        dispatch(changeTitleTodolistAC({todolistId, newTodolistTitle}))
    }


    return (
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
    );
};

export default Main;