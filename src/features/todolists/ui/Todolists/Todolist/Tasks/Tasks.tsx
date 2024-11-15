import React from 'react';
import List from "@mui/material/List";
import {TasksStateType} from "../../../../model/tasks-reducer";
import {useSelector} from "react-redux";
import {TodolistType} from "../../../../model/todolists-reducer";
import {RootState} from "../../../../../../app/store";
import {Task} from "./Task/Task";

type Props = {
    todolist: TodolistType,
}

export const Tasks = ({todolist}: Props) => {

    const tasks = useSelector<RootState, TasksStateType>(state => state.tasks)

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