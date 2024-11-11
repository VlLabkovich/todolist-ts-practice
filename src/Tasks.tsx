import React, {ChangeEvent} from 'react';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import {getListItemSx} from "./Todolist.styles";
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "./components/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, TasksStateType} from "./model/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {TodolistType} from "./model/todolists-reducer";
import {RootState} from "./app/store";

type PropsType = {
    todolist: TodolistType,
}

export const Tasks = ({todolist}: PropsType) => {

    const dispatch = useDispatch()

    const tasks = useSelector<RootState, TasksStateType>(state => state.tasks)

    const changeTasksStatus = (taskId: string, newIsDone: boolean, todolistId: string) => {
        dispatch(changeTaskStatusAC({taskId, newIsDone, todolistId}))
    }

    const removeTask = (taskId: string, todolistId: string) => {
        dispatch(removeTaskAC({todolistId, taskId}))
    }

    const updateTask = (newTaskTitle: string, todolistId: string, taskId: string) => {
        dispatch(changeTaskTitleAC({newTaskTitle, todolistId, taskId}))
    }

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
                )
                :
                (
                    <List>
                        {
                            tasksForTodolist.map((t) => {
                                    const changeTaskStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
                                        changeTasksStatus(t.id, event.currentTarget.checked, todolist.id)
                                    }

                                    const changeTaskTitleHandler = (newTaskTitle: string) => {
                                        updateTask(newTaskTitle, todolist.id, t.id)
                                    }

                                    const removeTaskHandler = () => {
                                        removeTask(t.id, todolist.id)
                                    }
                                    return (
                                        <ListItem key={t.id}
                                                  sx={getListItemSx(t.isDone)}
                                        >
                                            <div>
                                                <Checkbox
                                                    checked={t.isDone}
                                                    onChange={changeTaskStatusHandler}
                                                />
                                                <EditableSpan oldTitle={t.title}
                                                              updateTitle={changeTaskTitleHandler}/>
                                            </div>

                                            <IconButton aria-label="delete" onClick={removeTaskHandler} size="medium">
                                                <DeleteIcon fontSize="inherit"/>
                                            </IconButton>
                                        </ListItem>
                                    )
                                }
                            )
                        }
                    </List>
                )
            }
        </>

    );
};