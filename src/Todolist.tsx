import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Box from '@mui/material/Box'
import {filterButtonsContainerSx, getListItemSx} from "./Todolist.styles";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolistId: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (taskTitle: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, newIsDone: boolean, todolistId: string) => void
    filter: string
    removeTodolist: (todolistId: string) => void
    updateTaskTitle: (newTaskTitle: string, todolistId: string, taskId: string) => void
    updateTodolistTitle: (todolistId: string, newTodolistTitle: string) => void
}

export function Todolist({
                             todolistId,
                             title,
                             filter,
                             changeFilter,
                             tasks,
                             changeTaskStatus,
                             removeTask,
                             addTask,
                             removeTodolist,
                             updateTaskTitle,
                             updateTodolistTitle
                         }: PropsType) {

    const onChangeFilter = (value: FilterValuesType) => {
        changeFilter(value, todolistId)
    }

    // const mappedTasks = tasks.map(t => {
    //         const changeStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
    //             changeTaskStatus(t.id, event.currentTarget.checked, todolistId)
    //         }
    //         return (
    //             <li key={t.id} className={t.isDone ? s.isDone : ''}>
    //
    //                 <input
    //                     type="checkbox"
    //                     checked={t.isDone}
    //                     onChange={changeStatusHandler}
    //                 />
    //
    //                 <EditableSpan oldTitle={t.title} updateTitle={(newTitle)=> updateTaskTitle(newTitle, todolistId,t.id)}/>
    //
    //                 <Button title='x' onClick={() => {
    //                     removeTask(t.id, todolistId)
    //                 }}/>
    //             </li>
    //         )
    //     }
    // )

    const removeTodolistHandler = () => {
        removeTodolist(todolistId)
    }

    const addItemHandler = (taskTitle: string) => {
        addTask(taskTitle, todolistId)
    }

    const updateTodolistHandler = (newTodolistTitle: string) => {
        updateTodolistTitle(todolistId, newTodolistTitle)
    }

    return (
        <div>
            <div className='todolist-title-container'>
                <h3>
                    <EditableSpan oldTitle={title} updateTitle={updateTodolistHandler}/>
                </h3>
                <IconButton aria-label="delete" onClick={removeTodolistHandler} size={'large'}>
                    <DeleteIcon fontSize="inherit"/>
                </IconButton>
            </div>
            <div>
                <AddItemForm addItem={addItemHandler}/>
            </div>
            {/*<ul>{mappedTasks}</ul>*/}
            {
                tasks.length === 0 ?
                    <span>No tasks</span>
                    :
                    <List>
                        {
                            tasks.map(t => {
                                    const changeStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
                                        changeTaskStatus(t.id, event.currentTarget.checked, todolistId)
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
                                                                  updateTaskTitle(newTaskTitle, todolistId, t.id)
                                                              }}/>
                                            </div>

                                            <IconButton aria-label="delete" onClick={() => {
                                                removeTask(t.id, todolistId)
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
        </div>
    )
}