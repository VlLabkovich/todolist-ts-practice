import {useAppDispatch} from "common/hooks";
import React from 'react';
import Grid from "@mui/material/Unstable_Grid2";
import Container from "@mui/material/Container";
import {Todolists} from "../features/todolists/ui/Todolists/Todolists";
import {addTodolistAC} from "../features/todolists/model/todolists-reducer";
import {AddItemForm} from "common/components";

export const Main = () => {
    const dispatch = useAppDispatch()
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