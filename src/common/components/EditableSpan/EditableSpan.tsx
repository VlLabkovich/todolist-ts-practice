import { ChangeEvent, useState } from "react"
import TextField from "@mui/material/TextField"
import * as React from "react"

type Props = {
  oldTitle: string
  updateTitle: (title: string) => void
}
export const EditableSpan = ({ oldTitle, updateTitle }: Props) => {
  const [edit, setEdit] = useState<boolean>(false)

  const [title, setTitle] = useState<string>(oldTitle)

  const editModeHandler = () => {
    setEdit(!edit)
    if (edit) {
      updateItemHandler()
    }
  }

  const editEventTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value)
  }

  const updateItemHandler = () => {
    if (title.trim() !== "") {
      updateTitle(title.trim())
    }
  }

  return edit ? (
    <TextField
      variant="standard"
      label="Enter in task"
      value={title}
      onChange={editEventTitle}
      onBlur={editModeHandler}
      autoFocus={true}
    />
  ) : (
    <span onDoubleClick={editModeHandler}>{oldTitle}</span>
  )
}
