import React from 'react';
import {changeTitleTodolistAC, removeTodolistAC, TodolistType} from "./model/todolists-reducer";
import {EditableSpan} from "./components/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {useDispatch} from "react-redux";


type Props = {
    todolist: TodolistType
}

export const TodolistTitle = ({todolist}: Props) => {

    const {title, id} = todolist;

    const dispatch = useDispatch();

    const removeTodolistHandler = () => {
        dispatch(removeTodolistAC(id))
    }

    const updateTodolistHandler = (newTodolistTitle: string) => {
        dispatch(changeTitleTodolistAC({id, newTodolistTitle}))
    }

    return (
        <>
            <div className='todolist-title-container'>
                <h3>
                    <EditableSpan oldTitle={title} updateTitle={updateTodolistHandler}/>
                </h3>
                <IconButton aria-label="delete" onClick={removeTodolistHandler} size={'large'}>
                    <DeleteIcon fontSize="inherit"/>
                </IconButton>
            </div>
        </>
    );
};