import React from 'react';
import Grid from "@mui/material/Unstable_Grid2";
import Paper from "@mui/material/Paper";
import {Todolist} from "./Todolist/Todolist";
import {useAppSelector} from "../../../../common/hooks/useAppSelector";

export const Todolists = () => {

    const todolists = useAppSelector(state => state.todolists)

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
                            />
                        </Paper>
                    </Grid>
                )
            })}
        </>
    );
};