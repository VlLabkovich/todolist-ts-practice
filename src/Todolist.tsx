import React from 'react';
import {AddItemForm} from "./components/AddItemForm";
import {TodolistType} from "./model/todolists-reducer";
import {FilterTasksButtons} from "./FilterTasksButtons";
import {Tasks} from "./Tasks";
import {TodolistTitle} from "./TodolistTitle";
import {addTaskAC} from "./model/tasks-reducer";
import {useDispatch} from "react-redux";


type Props = {
    todolist: TodolistType
}

export const Todolist = ({todolist}: Props) => {

    const {id} = todolist;

    const dispatch = useDispatch();

    const addItemHandler = (taskTitle: string) => {
        dispatch(addTaskAC({ taskTitle, id }))
    }

    return (
        <div>
            <TodolistTitle todolist={todolist}/>
            <AddItemForm addItem={addItemHandler}/>
            <Tasks todolist={todolist}/>
            <FilterTasksButtons todolist={todolist}/>
        </div>
    )
}