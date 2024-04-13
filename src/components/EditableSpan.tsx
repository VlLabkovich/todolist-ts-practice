import {ChangeEvent, useState} from "react";
import TextField from "@mui/material/TextField";
import * as React from "react";

type Props = {
    oldTitle: string
    updateTitle: (newTitle: string) => void
};
export const EditableSpan = ({
                                 oldTitle,
                                 updateTitle
                             }: Props) => {

    const [edit, setEdit] = useState<boolean>(false);

    const [newTitle, setNewTitle] = useState<string>(oldTitle);

    const editModeHandler = () => {
        setEdit(!edit);
        if(edit) {
            updateItemHandler()
        }

    }

    const editEventTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(event.currentTarget.value)

    }

    const updateItemHandler = () => {
        if (newTitle.trim() !== '') {
            updateTitle(newTitle.trim())
        }

    }

    return (
        edit ?

            <TextField variant="standard"
                       size={'small'}
                       label="Enter in task"
                // multiline={true}
                       // rows={2}
                       value={newTitle}
                       onChange={editEventTitle}
                       onBlur={editModeHandler}
                       autoFocus={true}
            />
            :
            <span onDoubleClick={editModeHandler}>{oldTitle}</span>
    );
};