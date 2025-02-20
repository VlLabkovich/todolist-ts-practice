import DeleteIcon from "@mui/icons-material/Delete"
import Checkbox from "@mui/material/Checkbox"
import IconButton from "@mui/material/IconButton"
import ListItem from "@mui/material/ListItem"
import { EditableSpan } from "common/components"
import { useAppDispatch } from "common/hooks"
import React, { type ChangeEvent } from "react"
import type { DomainTask } from "../../../../../api/tasksApi.types"
import { TaskStatus } from "../../../../../lib/enums"
import { changeTaskStatusAC, changeTaskTitleAC, removeTaskTC } from "../../../../../model/tasks-reducer"
import type { DomainTodolist } from "../../../../../model/todolists-reducer"
import { getListItemSx } from "./Task.styles"

type Props = {
  todolist: DomainTodolist
  task: DomainTask
}

export const Task = ({ todolist, task }: Props) => {
  const todolistId = todolist.id
  const taskId = task.id
  const dispatch = useAppDispatch()

  const changeTaskStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
    let newIsDone = event.currentTarget.checked
    dispatch(changeTaskStatusAC({ taskId, newIsDone, todolistId }))
  }

  const changeTaskTitleHandler = (newTaskTitle: string) => {
    dispatch(changeTaskTitleAC({ newTaskTitle, todolistId, taskId }))
  }

  const removeTaskHandler = () => {
    dispatch(removeTaskTC({ todolistId, taskId }))
  }

  return (
    <ListItem key={task.id} sx={getListItemSx(task.status === TaskStatus.Completed)}>
      <div>
        <Checkbox checked={task.status === TaskStatus.Completed} onChange={changeTaskStatusHandler} />
        <EditableSpan oldTitle={task.title} updateTitle={changeTaskTitleHandler} />
      </div>
      <IconButton aria-label="delete" onClick={removeTaskHandler} size="medium">
        <DeleteIcon fontSize="inherit" />
      </IconButton>
    </ListItem>
  )
}
