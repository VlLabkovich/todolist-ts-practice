import {useAppSelector} from "common/hooks";
import React from 'react';
import List from "@mui/material/List";
import {TodolistType} from "../../../../model/todolists-reducer";
import {selectTasks} from "../../../../model/tasksSelectors";
import {Task} from "./Task/Task";

type Props = {
    todolist: TodolistType,
}

export const Tasks = ({todolist}: Props) => {

    const tasks = useAppSelector(selectTasks)

    const allTodolistTasks = tasks[todolist.id]

    let tasksForTodolist = allTodolistTasks

    if (todolist.filter === "active") {
        tasksForTodolist = allTodolistTasks.filter(t => !t.isDone);
    }
    if (todolist.filter === "completed") {
        tasksForTodolist = allTodolistTasks.filter(t => t.isDone);
    }

    return (
        <>
            {tasksForTodolist.length === 0 ? (
                <span>No tasks</span>
            ) : (
                <List>
                    {tasksForTodolist.map((task) => {
                            return <Task todolist={todolist} task={task}/>
                        })
                    }
                </List>
            )}
        </>
    );
};