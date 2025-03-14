import AddBoxIcon from "@mui/icons-material/AddBox"
import IconButton from "@mui/material/IconButton"
import TextField from "@mui/material/TextField"
import * as React from "react"
import { ChangeEvent, KeyboardEvent, useState } from "react"

type Props = {
  addItem: (title: string) => void
  disabled?: boolean
}
export const AddItemForm = ({ addItem, disabled }: Props) => {
  let [error, setError] = useState<string | null>(null)
  let [title, setTitle] = useState("")

  const addItemHandler = () => {
    if (title.trim() !== "") {
      addItem(title.trim())
      setTitle("")
    } else {
      setError("This is required")
    }
  }

  const onChangeEventHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value)
  }
  const onKeyDownEventHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    setError("")
    if (event.key === "Enter") {
      addItemHandler()
    }
  }

  return (
    <div>
      <TextField
        variant="outlined"
        label="Enter in title"
        size={"small"}
        error={!!error}
        helperText={error}
        value={title}
        onChange={onChangeEventHandler}
        onKeyDown={onKeyDownEventHandler}
        disabled={disabled}
      />
      <IconButton onClick={addItemHandler} color={"primary"} disabled={disabled}>
        <AddBoxIcon />
      </IconButton>
    </div>
  )
}
