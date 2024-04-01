import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import s from './Todolist.module.css'

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, newIsDone: boolean) => void
    filter: string
}

export function Todolist({title, filter, changeFilter, tasks, changeTaskStatus, removeTask, addTask}: PropsType) {

    let [taskTitle, setTaskTitle] = useState('')
    let [error, setError] = useState<string | null>(null)

    const addTaskHandler = () => {
        if (taskTitle.trim() !== '') {
            addTask(taskTitle.trim())
            setTaskTitle('')
        } else {
            setError('This is required')
        }
    }

    const onChangeEventHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value)
    }

    const onKeyDownEventHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError('')
        if (event.key === 'Enter') {
            addTaskHandler()
        }
    }

    const onChangeFilter = (value: FilterValuesType) => {
        changeFilter(value)
    }

    const mappedTasks = tasks.map(t => {
        const changeStatusHandler = (event: ChangeEvent<HTMLInputElement> ) => {
        changeTaskStatus(t.id, event.currentTarget.checked)
        }

      return  <li key={t.id} className={t.isDone? s.isDone : ''}>

            <input
                type="checkbox"
                checked={t.isDone}
                // onChange={(event) => changeStatusHandler(t.id, event.currentTarget.checked)}
                onChange={changeStatusHandler}
            />
            <span>{t.title}</span>
            <button onClick={() => {removeTask(t.id)}}>x</button>
        </li>
        }
    )


    return <div>
        <h3>{title}</h3>
        <div>
            <input className={error ? s.error : ''}
                   value={taskTitle}
                   onChange={onChangeEventHandler}
                   onKeyDown={onKeyDownEventHandler}/>
            <button onClick={addTaskHandler}>+</button>
            {error && <div className={s.errorMessage}>{error}</div>}
        </div>
        <ul>{mappedTasks}</ul>

        <div>
            <button className={filter === 'all' ? s.activeFilter: ''}
                    onClick={() => {onChangeFilter("all")}}>All</button>

            <button className={filter === 'active' ? s.activeFilter: ''}
                    onClick={() => {onChangeFilter("active")}}>Active</button>

            <button className={filter === 'completed' ? s.activeFilter: ''}
                    onClick={() => {onChangeFilter("completed")}}>Completed</button>
        </div>

    </div>
}