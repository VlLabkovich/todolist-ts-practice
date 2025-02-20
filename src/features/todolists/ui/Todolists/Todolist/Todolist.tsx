import { useAppDispatch } from "common/hooks"
import type { DomainTodolist } from "../../../model/todolists-reducer"
import { FilterTasksButtons } from "./FilterTasksButtons/FilterTasksButtons"
import { Tasks } from "./Tasks/Tasks"
import { TodolistTitle } from "./TodolistTitle/TodolistTitle"
import { addTaskTC } from "../../../model/tasks-reducer"
import { AddItemForm } from "common/components"

type Props = {
  todolist: DomainTodolist
}

export const Todolist = ({ todolist }: Props) => {
  const todolistId = todolist.id

  const dispatch = useAppDispatch()

  const addItemHandler = (title: string) => {
    dispatch(addTaskTC({ title, todolistId }))
  }

  return (
    <div>
      <TodolistTitle todolist={todolist} />
      <AddItemForm addItem={addItemHandler} />
      <Tasks todolist={todolist} />
      <FilterTasksButtons todolist={todolist} />
    </div>
  )
}
