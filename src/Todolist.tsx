import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import s from './Todolist.module.css'

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addMessage: (title: string) => void
    changeStatus: (taskId: string, newIsDone: boolean) => void
    filter: string
}

export function Todolist(props: PropsType) {

    let [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)

    const addMessage = () => {
        if(title.trim() !== '') {
            props.addMessage(title.trim())
            setTitle('')
        } else {
            setError('This is required')
        }
    }

    const onChangeEventHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    const onKeyDownEventHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError('')
        if (event.key === 'Enter') {
            addMessage()
        }
    }

    const onChangeFilter = (value: FilterValuesType) => {
        props.changeFilter(value)
    }

    // const changeStatusHandler = (taskId: string, newIsDone: boolean) => {
    //     props.changeStatus(taskId, newIsDone)
    // }

    const mappedTasks = props.tasks.map(t => {
        const changeStatusHandler = (event: ChangeEvent<HTMLInputElement> ) => {
        props.changeStatus(t.id, event.currentTarget.checked)
        }

      return  <li key={t.id} className={t.isDone? s.isDone : ''}>

            <input
                type="checkbox"
                checked={t.isDone}
                // onChange={(event) => changeStatusHandler(t.id, event.currentTarget.checked)}
                onChange={changeStatusHandler}
            />
            <span>{t.title}</span>
            <button onClick={() => {props.removeTask(t.id)}}>x</button>
        </li>
        }
    )


    return <div>
        <h3>{props.title}</h3>
        <div>
            <input className={error ? s.error : ''}
                   value={title}
                   onChange={onChangeEventHandler}
                   onKeyDown={onKeyDownEventHandler}/>
            <button onClick={addMessage}>+</button>
            {error && <div className={s.errorMessage}>{error}</div>}
        </div>
        <ul>{mappedTasks}</ul>

        <div>
            <button className={props.filter === 'all' ? s.activeFilter: ''}
                    onClick={() => {onChangeFilter("all")}}>All</button>

            <button className={props.filter === 'active' ? s.activeFilter: ''}
                    onClick={() => {onChangeFilter("active")}}>Active</button>

            <button className={props.filter === 'completed' ? s.activeFilter: ''}
                    onClick={() => {onChangeFilter("completed")}}>Completed</button>
        </div>

    </div>
}