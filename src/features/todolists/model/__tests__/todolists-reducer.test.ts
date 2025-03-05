import {
  addTodolistAC,
  changeFilterTodolistAC,
  type DomainTodolist,
  removeTodolistAC,
  todolistsReducer,
  updateTodolistTitleAC,
} from "../todolists-reducer"

let startState: DomainTodolist[] = []

const todolistId1 = "1"
const todolistId2 = "2"
const todolistId3 = "3"

beforeEach(() => {
  startState = [
    {
      id: todolistId1,
      title: "What to learn?",
      addedDate: "",
      order: 0,
      filter: "all",
    },
    {
      id: todolistId2,
      title: "What to buy?",
      addedDate: "",
      order: 0,
      filter: "all",
    },
  ]
})

test("correct todolist should be removed", () => {
  const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))
  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe(todolistId2)

  console.log(endState)
})

test("correct todolist should be added", () => {
  const action = addTodolistAC({
    id: todolistId3,
    title: "New Todolist",
    addedDate: "",
    order: 0,
    filter: "all",
  })

  const endState = todolistsReducer(startState, action)

  const newTitle = "New Todolist"

  expect(endState.length).toBe(3)
  expect(endState[0].title).toBe(newTitle)

  console.log(endState)
})

test("correct todolist should change its name", () => {
  const newTitle = "New Todolist"

  const action = updateTodolistTitleAC({ id: todolistId2, title: newTitle })

  const endState = todolistsReducer(startState, action)

  expect(endState[0].title).toBe("What to learn?")
  expect(endState[1].title).toBe(newTitle)

  console.log(endState)
})

test("correct filter of todolist should be changed", () => {
  const newFilter = "completed"
  const action = changeFilterTodolistAC({
    id: todolistId2,
    filter: newFilter,
  })
  const endState = todolistsReducer(startState, action)
  expect(endState[0].filter).toBe("all")
  expect(endState[1].filter).toBe(newFilter)

  console.log(endState)
})
