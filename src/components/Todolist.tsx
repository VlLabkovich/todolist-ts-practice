import React from 'react';
import {AddItemForm} from "./AddItemForm";
import {TodolistType} from "../model/todolists-reducer";
import {FilterTasksButtons} from "../FilterTasksButtons";
import {Tasks} from "../Tasks";
import {TodolistTitle} from "../TodolistTitle";


type Props = {
    todolist: TodolistType
    addTask: (taskTitle: string, todolistId: string) => void
}

export function Todolist({
                             todolist,
                             addTask,
                         }: Props) {

    const addItemHandler = (taskTitle: string) => {
        addTask(taskTitle, todolist.id)
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