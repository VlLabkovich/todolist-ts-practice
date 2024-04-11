
import * as React from 'react';
import s from "../Todolist.module.css";
import {Button} from "./Button";
import {ChangeEvent, KeyboardEvent, useState} from "react";

type PropsAddItemForm = {
    addItem: (itemTitle: string) => void
};
export const AddItemForm = ({addItem}: PropsAddItemForm) => {

    let [error, setError] = useState<string | null>(null)
    let [itemTitle, setItemTitle] = useState('')

    const addItemHandler = () => {
        if (itemTitle.trim() !== '') {
            addItem(itemTitle.trim())
            setItemTitle('')
        } else {
            setError('This is required')
        }
    }

    const onChangeEventHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setItemTitle(event.currentTarget.value)
    }

    const onKeyDownEventHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError('')
        if (event.key === 'Enter') {
            addItemHandler()
        }
    }

    return (
        <div>
            <input className={error ? s.error : ''}
                   value={itemTitle}
                   onChange={onChangeEventHandler}
                   onKeyDown={onKeyDownEventHandler}/>
            <Button title='+' onClick={addItemHandler}/>
            {error && <div className={s.errorMessage}>{error}</div>}
        </div>
    );
};