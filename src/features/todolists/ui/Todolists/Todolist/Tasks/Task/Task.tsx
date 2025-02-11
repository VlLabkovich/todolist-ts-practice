import { useAppDispatch } from "common/hooks"
import React, { type ChangeEvent } from "react"
import ListItem from "@mui/material/ListItem"
import Checkbox from "@mui/material/Checkbox"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import { changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, TaskType } from "../../../../../model/tasks-reducer"
import type { DomainTodolist } from "../../../../../model/todolists-reducer"
import { getListItemSx } from "./Task.styles"
import { EditableSpan } from "common/components"

type Props = {
  todolist: DomainTodolist
  task: TaskType
}

export const Task = ({ todolist, task }: Props) => {
  const { id } = todolist
  let taskId = task.id
  const dispatch = useAppDispatch()

  const changeTaskStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
    let newIsDone = event.currentTarget.checked
    dispatch(changeTaskStatusAC({ taskId, newIsDone, id }))
  }

  const changeTaskTitleHandler = (newTaskTitle: string) => {
    dispatch(changeTaskTitleAC({ newTaskTitle, id, taskId }))
  }

  const removeTaskHandler = () => {
    dispatch(removeTaskAC({ id, taskId }))
  }
  return (
    <ListItem key={task.id} sx={getListItemSx(task.isDone)}>
      <div>
        <Checkbox checked={task.isDone} onChange={changeTaskStatusHandler} />
        <EditableSpan oldTitle={task.title} updateTitle={changeTaskTitleHandler} />
      </div>
      <IconButton aria-label="delete" onClick={removeTaskHandler} size="medium">
        <DeleteIcon fontSize="inherit" />
      </IconButton>
    </ListItem>
  )
}
