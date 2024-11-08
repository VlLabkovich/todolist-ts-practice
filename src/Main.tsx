import React from 'react';
import {AddItemForm} from "./components/AddItemForm";
import Grid from "@mui/material/Unstable_Grid2";
import Container from "@mui/material/Container";
import Todolists from "./Todolists";
import {addTodolistAC} from "./model/todolists-reducer";
import {useDispatch} from "react-redux";

export const Main = () => {
    const dispatch = useDispatch()
    const addTodolist = (todolistTitle: string) => {
        dispatch(addTodolistAC(todolistTitle))
    }

    return (
        <Container fixed>
            <Grid container
                  sx={{marginBottom: '30px'}}>
                <AddItemForm addItem={addTodolist}/>
            </Grid>
            <Grid container spacing={4}>
                <Todolists/>
            </Grid>
        </Container>
    );
};