import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import s from './Todolist.module.css'
import {Button} from "./components/Button";
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";

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
    updateTaskTitle: (newTitle: string, todolistId: string, taskId: string) => void
    updateTodolistTitle: (todolistId: string, newTitle: string) => void
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

    const mappedTasks = tasks.map(t => {
            const changeStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
                changeTaskStatus(t.id, event.currentTarget.checked, todolistId)
            }

            const updateTaskHandler = (newTitle:string) => {
                updateTaskTitle(newTitle, todolistId, t.id)
            }


            return <li key={t.id} className={t.isDone ? s.isDone : ''}>

                <input
                    type="checkbox"
                    checked={t.isDone}
                    onChange={changeStatusHandler}
                />

              <EditableSpan oldTitle={t.title} updateTitle={updateTaskHandler}/>

                <Button title='x' onClick={() => {
                    removeTask(t.id, todolistId)
                }}/>
            </li>
        }
    )

    const removeHandlerTodolist = () => {
        removeTodolist(todolistId)
    }

    const addItemHandler = (itemTitle: string) => {
        addTask(itemTitle, todolistId)
    }

    const updateTodolistHandler = (newTitle: string) => {
        updateTodolistTitle(todolistId, newTitle)
    }



    return <div>
        <div className='title-btn-del-todo'>
            <h3>
                <EditableSpan oldTitle={title} updateTitle={updateTodolistHandler}/>
            </h3>

            <Button title='X' onClick={removeHandlerTodolist}/>
        </div>
        <div>
            <AddItemForm addItem={addItemHandler}/>
        </div>
        <ul>{mappedTasks}</ul>

        <div>
            <Button title='All' className={filter === 'all' ? s.activeFilter : ''}
                    onClick={() => {
                        onChangeFilter("all")
                    }}/>

            <Button title='Active' className={filter === 'active' ? s.activeFilter : ''}
                    onClick={() => {
                        onChangeFilter("active")
                    }}/>

            <Button title='Completed' className={filter === 'completed' ? s.activeFilter : ''}
                    onClick={() => {
                        onChangeFilter("completed")
                    }}/>
        </div>

    </div>
}