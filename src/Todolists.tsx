import React from 'react';
import Grid from "@mui/material/Unstable_Grid2";
import Paper from "@mui/material/Paper";
import {Todolist} from "./components/Todolist";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./app/store";
import {
    changeTitleTodolistAC,
    removeTodolistAC,
    TodolistType
} from "./model/todolists-reducer";
import {addTaskAC} from "./model/tasks-reducer";

export const Todolists = () => {
    const dispatch = useDispatch()

    const todolists = useSelector<RootState, TodolistType[]>(state => state.todolists)

    const addTaskHandler = (taskTitle: string, todolistId: string) => {
        dispatch(addTaskAC({taskTitle, todolistId}))
    }

    const removeTodolist = (todolistId: string) => {
        dispatch(removeTodolistAC(todolistId))
    }

    const updateTodolistHandler = (todolistId: string, newTodolistTitle: string) => {
        dispatch(changeTitleTodolistAC({todolistId, newTodolistTitle}))
    }

    return (
        <>
            {todolists.map(el => {

                return (
                    <Grid key={el.id}>
                        <Paper elevation={2}
                               sx={{padding: '0 20px 20px 20px'}}>
                            <Todolist
                                key={el.id}
                                todolist={el}
                                addTask={addTaskHandler}
                                removeTodolist={removeTodolist}
                                updateTodolistTitle={updateTodolistHandler}
                            />
                        </Paper>
                    </Grid>
                )
            })}
        </>
    );
};

export default Todolists;