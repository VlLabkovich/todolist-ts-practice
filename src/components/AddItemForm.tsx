
import * as React from 'react';
import {ChangeEvent, KeyboardEvent, useState} from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

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
            <TextField variant="outlined"
                       label="Enter in title"
                       size={'small'}
                       error={!!error}
                       helperText={error}
                       value={itemTitle}
                       onChange={onChangeEventHandler}
                       onKeyDown={onKeyDownEventHandler}
            />
            <Button variant={'contained'}
                    onClick={addItemHandler}
            >+</Button>
        </div>
    );
};