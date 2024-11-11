import React from 'react';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {TodolistType} from "../model/todolists-reducer";
import {FilterTasksButtons} from "../FilterTasksButtons";
import {Tasks} from "../Tasks";


type PropsType = {
    todolist: TodolistType
    addTask: (taskTitle: string, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
    updateTodolistTitle: (todolistId: string, newTodolistTitle: string) => void
}

export function Todolist({
                             todolist,
                             addTask,
                             removeTodolist,
                             updateTodolistTitle
                         }: PropsType) {

    const removeTodolistHandler = () => {
        removeTodolist(todolist.id)
    }

    const addItemHandler = (taskTitle: string) => {
        addTask(taskTitle, todolist.id)
    }

    const updateTodolistHandler = (newTodolistTitle: string) => {
        updateTodolistTitle(todolist.id, newTodolistTitle)
    }

    return (
        <div>
            <div className='todolist-title-container'>
                <h3>
                    <EditableSpan oldTitle={todolist.title} updateTitle={updateTodolistHandler}/>
                </h3>
                <IconButton aria-label="delete" onClick={removeTodolistHandler} size={'large'}>
                    <DeleteIcon fontSize="inherit"/>
                </IconButton>
            </div>
            <div>
                <AddItemForm addItem={addItemHandler}/>
            </div>
            {
                <Tasks todolist={todolist}/>
            }

            <FilterTasksButtons todolist={todolist}/>
        </div>
    )
}