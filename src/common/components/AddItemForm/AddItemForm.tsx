import * as React from "react"
import { ChangeEvent, KeyboardEvent, useState } from "react"
import IconButton from "@mui/material/IconButton"
import TextField from "@mui/material/TextField"
import AddBoxIcon from "@mui/icons-material/AddBox"

type Props = {
  addItem: (title: string) => void
}
export const AddItemForm = ({ addItem }: Props) => {
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
      />
      <IconButton onClick={addItemHandler} color={"primary"}>
        <AddBoxIcon />
      </IconButton>
    </div>
  )
}
