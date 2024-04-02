import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed";

type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksStateType = {
    [key: string]: TaskType[]
}

function App() {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'active'}
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistID1]: [
            {id: v1(), title: 'HTML & CSS', isDone: true},
            {id: v1(), title: 'JAVASCRIPT', isDone: false},
            {id: v1(), title: 'REACTJS', isDone: true}
        ],
        [todolistID2]: [
            {id: v1(), title: 'REST API', isDone: true},
            {id: v1(), title: 'GRAPHQL', isDone: false}
        ],
    })

    function removeTask(taskId: string, todolistId: string) {
        setTasks({...tasks,
                            [todolistId]:
                                tasks[todolistId].filter(el => el.id !== taskId)})
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {

        setTodolists(todolists.map(el => el.id === todolistId ? {...el, filter: value} : el))

        // setTodolists(todolists.map(el =>
        //     el.id === todolistId ? {...el, filter: value} : el))
    }

    const addTaskHandler = (title: string, todolistId: string) => {
        let newTask = {id: v1(), title, isDone: false}
        setTasks({...tasks, [todolistId]:[newTask, ...tasks[todolistId]]})

        // let newMessage = {id: v1(), title: title, isDone: false}
        // setTasks([newMessage, ...tasks])
    }

    const changeTasksStatus = (taskId: string, newIsDone: boolean, todolistId: string) => {

        setTasks({...tasks,
            [todolistId]: tasks[todolistId].map(el => el.id === taskId ? {...el, isDone: newIsDone}: el)})

        // setTasks(tasks.map(task => task.id === taskId ? {...task, isDone: newIsDone} : task))
    }

    const removeHandlerTodolist = (todolistId: string) => {
        // сетаем оставшийся тудулист
        setTodolists(todolists.filter(el => el.id !== todolistId))
        // удаляем из стейта таски относящиеся к удалённому тудулисту
        delete tasks[todolistId]
        // сетаем(обновляем) изменённую копию объекта в стейт
        setTasks({...tasks})
    }
    return (
        <div className="App">

            {todolists.map(el => {

                const allTodolistTasks = tasks[el.id]

                let tasksForTodolist = allTodolistTasks

                if (el.filter === "active") {
                    tasksForTodolist = allTodolistTasks.filter(t => !t.isDone);
                }
                if (el.filter === "completed") {
                    tasksForTodolist = allTodolistTasks.filter(t => t.isDone);
                }

                return(
                    <Todolist
                        key={el.id}
                        todolistId={el.id}
                        title={el.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTaskHandler}
                        changeTaskStatus={changeTasksStatus}
                        filter={el.filter}
                        removeTodolist={removeHandlerTodolist}
                    />
                )
            })}
        </div>
    );
}

export default App;
