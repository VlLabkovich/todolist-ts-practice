import React, {ChangeEvent} from 'react';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import {getListItemSx} from "../Todolist.styles";
import {TaskType} from "../model/tasks-reducer";
import {TodolistType} from "../model/todolists-reducer";
import {FilterTasksButtons} from "../FilterTasksButtons";

type PropsType = {
    todolist: TodolistType
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    addTask: (taskTitle: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, newIsDone: boolean, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
    updateTaskTitle: (newTaskTitle: string, todolistId: string, taskId: string) => void
    updateTodolistTitle: (todolistId: string, newTodolistTitle: string) => void
}

export function Todolist({
                             todolist,
                             tasks,
                             changeTaskStatus,
                             removeTask,
                             addTask,
                             removeTodolist,
                             updateTaskTitle,
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
                tasks.length === 0 ?
                    <span>No tasks</span>
                    :
                    <List>
                        {
                            tasks.map(t => {
                                    const changeStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
                                        changeTaskStatus(t.id, event.currentTarget.checked, todolist.id)
                                    }
                                    return (
                                        <ListItem key={t.id}
                                                  sx={getListItemSx(t.isDone)}
                                        >
                                            <div>
                                                <Checkbox
                                                    checked={t.isDone}
                                                    onChange={changeStatusHandler}
                                                />
                                                <EditableSpan oldTitle={t.title}
                                                              updateTitle={(newTaskTitle: string) => {
                                                                  updateTaskTitle(newTaskTitle, todolist.id, t.id)
                                                              }}/>
                                            </div>

                                            <IconButton aria-label="delete" onClick={() => {
                                                removeTask(t.id, todolist.id)
                                            }} size="medium">
                                                <DeleteIcon fontSize="inherit"/>
                                            </IconButton>
                                        </ListItem>
                                    )
                                }
                            )
                        }
                    </List>
            }

            <FilterTasksButtons todolist={todolist} />
        </div>
    )
}