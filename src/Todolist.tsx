import React, {useState} from 'react';

type TaskType = {
    id: number
    title: string
    isDone: boolean
}
type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: number) => void
}

export function Todolist(props: PropsType) {
    let [newParol, setNewParol] = useState('All')

    const filterTasks = (parol: string) => {
        setNewParol(parol)
    }

    const durshlagFoo = () => {
        let durshlag = props.tasks;

        switch (newParol) {
            case 'Active': {
                return props.tasks.filter(el => el.isDone === true)
            }
            case 'Completed': {
                return props.tasks.filter(el => el.isDone === false)
            }

            default: return props.tasks
        }


        // if (newParol === 'Active') {
        //      durshlag = props.tasks.filter(el => el.isDone === true)
        // }
        // if (newParol === 'Completed') {
        //      durshlag = props.tasks.filter(el => el.isDone === false)
        // }

        // return durshlag
    }


    return <div>
        <h3>{props.title}</h3>
        <div>
            <input/>
            <button>+</button>
        </div>
        <ul>
            {durshlagFoo().map(el => {
                return (
                    <li key={el.id}>
                        <button onClick={() => props.removeTask(el.id)}>X</button>
                        <input type="checkbox" checked={el.isDone}/>
                        <span>{el.title}</span>
                    </li>
                )
            })}
        </ul>
        <div>
            <button onClick={() => filterTasks('All')}>All</button>
            <button onClick={() => filterTasks('Active')}>Active</button>
            <button onClick={() => filterTasks('Completed')}>Completed</button>
        </div>
    </div>
}
