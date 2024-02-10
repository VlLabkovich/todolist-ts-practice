import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';

function App() {

    // let tasks = [
    //     { id: 1, title: "HTML&CSS", isDone: true },
    //     { id: 2, title: "JS", isDone: true },
    //     { id: 3, title: "ReactJS", isDone: false }
    // ]

    let [tasks, setTasks] = useState([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false}
    ])



    const removeTask = (taskId: number) => {
        setTasks(tasks.filter(el => el.id !== taskId))
    }

    // let[newParol,setNewParol]=useState('All')
    // const filterTasks = (parol: string) => {
    //     setNewParol(parol)
    // }
    //
    // let durshlag = tasks
    // if (newParol === 'Active') {
    //     durshlag = tasks.filter(el => el.isDone === true)
    // }
    // if (newParol === 'Completed') {
    //     durshlag = tasks.filter(el => el.isDone === false)
    // }

    return (
        <div className="App">
            <Todolist
                title="What to learn"
                tasks={tasks}
                removeTask={removeTask}
                // filterTasks={filterTasks}
            />
        </div>
    );
}

export default App;
