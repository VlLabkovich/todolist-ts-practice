import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';

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
}

export function Todolist(props: PropsType) {

    let [title, setTitle] = useState('')

    const addMessage = () => {
        props.addMessage(title)
        setTitle('')
    }

    const onChangeEventHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    const onKeyDownEventHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addMessage()
        }
    }

    const onChangeFilter = (value: FilterValuesType) => {
        props.changeFilter(value)
    }

    const mappedTasks = props.tasks.map(t =>

        <li key={t.id}>

            <input type="checkbox" checked={t.isDone}/>
            <span>{t.title}</span>
            <button onClick={() => {props.removeTask(t.id)}}>x</button>
        </li>
    )


    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title}
                   onChange={onChangeEventHandler}
                   onKeyDown={onKeyDownEventHandler}/>
            <button onClick={addMessage}>+</button>
        </div>
        <ul>{mappedTasks}</ul>
        <div>

            <button onClick={() => {
                onChangeFilter("all")
            }}>All
            </button>
            <button onClick={() => {
                onChangeFilter("active")
            }}>Active
            </button>
            <button onClick={() => {
                onChangeFilter("completed")
            }}>Completed
            </button>

        </div>
    </div>
}