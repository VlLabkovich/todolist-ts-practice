import { useAppDispatch, useAppSelector } from "common/hooks"
import React, { useEffect } from "react"
import List from "@mui/material/List"
import { TaskStatus } from "../../../../lib/enums"
import { fetchTasksTC } from "../../../../model/tasks-reducer"
import { selectTasks } from "../../../../model/tasksSelectors"
import { type DomainTodolist } from "../../../../model/todolists-reducer"
import { Task } from "./Task/Task"

type Props = {
  todolist: DomainTodolist
}

export const Tasks = ({ todolist }: Props) => {
  const tasks = useAppSelector(selectTasks)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchTasksTC(todolist.id))
  }, [])

  const allTodolistTasks = tasks[todolist.id]

  let tasksForTodolist = allTodolistTasks

  if (todolist.filter === "active") {
    tasksForTodolist = allTodolistTasks.filter((t) => t.status === TaskStatus.New)
  }
  if (todolist.filter === "completed") {
    tasksForTodolist = allTodolistTasks.filter((t) => t.status === TaskStatus.Completed)
  }

  return (
    <>
      {tasksForTodolist?.length === 0 ? (
        <span>No tasks</span>
      ) : (
        <List>
          {tasksForTodolist?.map((task) => {
            return <Task todolist={todolist} task={task} />
          })}
        </List>
      )}
    </>
  )
}
