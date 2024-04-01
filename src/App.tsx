import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed";

type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: v1(), title: 'What to learn', filter: 'all'},
        {id: v1(), title: 'What to buy', filter: 'active'}
    ])

    let [tasks, setTasks] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},
    ]);

    function removeTask(id: string) {
        setTasks(tasks.filter(t => t.id !== id));
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        setTodolists(todolists.map(el =>
            el.id === todolistId ? {...el, filter: value} : el))
    }

    const addTaskHandler = (title: string) => {
        let newMessage = {id: v1(), title: title, isDone: false}
        setTasks([newMessage, ...tasks])
    }

    const changeTasksStatus = (taskId: string, newIsDone: boolean) => {
        setTasks(tasks.map(task => task.id === taskId ? {...task, isDone: newIsDone} : task))
    }

    return (
        <div className="App">

            {todolists.map(el => {

                let tasksForTodolist = tasks;

                if (el.filter === "active") {
                    tasksForTodolist = tasks.filter(t => !t.isDone);
                }
                if (el.filter === "completed") {
                    tasksForTodolist = tasks.filter(t => t.isDone);
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
                    />
                )
            })}
        </div>
    );
}

export default App;
