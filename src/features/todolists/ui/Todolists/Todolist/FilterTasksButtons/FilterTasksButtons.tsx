import {useAppDispatch} from "common/hooks";
import React from 'react';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {changeFilterTodolistAC, FilterValuesType, TodolistType} from "../../../../model/todolists-reducer";
import {filterButtonsContainerSx} from "./FilterTasksButtons.styles";

type Props = {
    todolist: TodolistType
}
export const FilterTasksButtons = ({todolist}: Props) => {
    const {filter, id} = todolist

    const dispatch = useAppDispatch()

    const onChangeFilter = (filter: FilterValuesType) => {
        dispatch(changeFilterTodolistAC({id, filter}))
    }

    return (
        <>
            <Box sx={filterButtonsContainerSx}>
                <Button color={'primary'}
                        variant={filter === 'all' ? 'outlined' : 'contained'}
                        onClick={() => {
                            onChangeFilter("all")
                        }}>All</Button>

                <Button color={'primary'}
                        variant={filter === 'active' ? 'outlined' : 'contained'}
                        onClick={() => {
                            onChangeFilter("active")
                        }}>Active</Button>

                <Button color={'primary'}
                        variant={filter === 'completed' ? 'outlined' : 'contained'}
                        onClick={() => {
                            onChangeFilter("completed")
                        }}>Completed</Button>
            </Box>
        </>
    );
};