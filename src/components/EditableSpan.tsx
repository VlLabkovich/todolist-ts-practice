import {ChangeEvent, useState} from "react";

type Props = {
    oldTitle: string
    updateTitle: (newTitle: string) => void
};
export const EditableSpan = ({
                                 oldTitle,
                                 updateTitle
                             }: Props) => {

    const[edit, setEdit] = useState<boolean>(false);

    const[newTitle, setNewTitle] = useState<string>(oldTitle);

    const editModeHandler = () => {
        setEdit(!edit);
        updateTaskHandler()
    }

    const editEventTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(event.currentTarget.value)

    }

    const updateTaskHandler = () => {
        updateTitle(newTitle.trim())
    }

    return (
        edit ? <input value={newTitle}
                      onChange={editEventTitle}
                      onBlur={editModeHandler}
                      autoFocus={true}/>
            :
            <span onDoubleClick={editModeHandler}>
              {oldTitle}
            </span>
    );
};