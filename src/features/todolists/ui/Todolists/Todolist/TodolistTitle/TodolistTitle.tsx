import DeleteIcon from "@mui/icons-material/Delete"
import IconButton from "@mui/material/IconButton"
import { EditableSpan } from "common/components"
import { useAppDispatch } from "common/hooks"
import React from "react"
import { type DomainTodolist, removeTodolistTC, updateTodolistTitleTC } from "../../../../model/todolists-reducer"
import s from "./TodolistTitle.module.css"

type Props = {
  todolist: DomainTodolist
}

export const TodolistTitle = ({ todolist }: Props) => {
  const { title, id } = todolist

  const dispatch = useAppDispatch()

  const removeTodolistHandler = () => {
    dispatch(removeTodolistTC(id))
  }

  const updateTodolistHandler = (title: string) => {
    dispatch(updateTodolistTitleTC({ id, title }))
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
