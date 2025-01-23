import { useAppDispatch } from "common/hooks"
import React from "react"
import { changeTitleTodolistAC, removeTodolistAC, TodolistType } from "../../../../model/todolists-reducer"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import s from "./TodolistTitle.module.css"
import { EditableSpan } from "common/components"

type Props = {
  todolist: TodolistType
}

export const TodolistTitle = ({ todolist }: Props) => {
  const { title, id } = todolist

  const dispatch = useAppDispatch()

  const removeTodolistHandler = () => {
    dispatch(removeTodolistAC(id))
  }

  const updateTodolistHandler = (newTodolistTitle: string) => {
    dispatch(changeTitleTodolistAC({ id, newTodolistTitle }))
  }

  return (
    <>
      <div className={s.container}>
        <h3>
          <EditableSpan oldTitle={title} updateTitle={updateTodolistHandler} />
        </h3>
        <IconButton aria-label="delete" onClick={removeTodolistHandler} size={"large"}>
          <DeleteIcon fontSize="inherit" />
        </IconButton>
      </div>
    </>
  )
}
