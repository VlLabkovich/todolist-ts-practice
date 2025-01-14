import Checkbox from '@mui/material/Checkbox'
import axios from "axios";
import React, {ChangeEvent, useEffect, useState} from 'react'
import {AddItemForm} from '../common/components/AddItemForm/AddItemForm'
import {EditableSpan} from '../common/components/EditableSpan/EditableSpan'

export type Todolist = {
    id: string
    title: string
    addedDate: string
    order: number
}

export type FieldError = {
    error: string
    field: string
}

export type CreateTodolistResponse = {
    resultCode: number
    messages: string[]
    fieldsErrors: FieldError[]
    data: {
        item: Todolist
    }
}

export type DeleteTodolistResponse = {
    resultCode: number
    messages: string[]
    fieldsErrors: FieldError[]
    data: {}
}

export type UpdateTodolistResponse = {
    resultCode: number
    messages: string[]
    fieldsErrors: FieldError[]
    data: {}
}

export type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: DomainTask[]
}

export type DomainTask = {
    description: string
    title: string
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export type CreateTaskResponse = {
    resultCode: number
    messages: string[]
    fieldsErrors: FieldError[]
    data: {
        item: DomainTask
    }
}

export type DeleteTaskResponse = {
    resultCode: number
    messages: string[]
    fieldsErrors: FieldError[]
    data: {}
}

export type UpdateTaskModel = {
    title: string;
    description: string;
    status: number;
    priority: number;
    startDate: string;
    deadline: string;
};

export type UpdateTaskResponse = {
    resultCode: number
    messages: string[]
    fieldsErrors: FieldError[]
    data: {
        item: DomainTask
    }
}

export const AppHttpRequests = () => {
    const [todolists, setTodolists] = useState<Todolist[]>([])
    const [tasks, setTasks] = useState<{ [key: string]: DomainTask[] }>({})

    useEffect(() => {
        axios.get<Todolist[]>('https://social-network.samuraijs.com/api/1.1/todo-lists', {
            headers: {
                Authorization: 'Bearer 6abad6d5-ca67-446c-9608-5cdc421e16de',
            },
        }).then(res => {
            const todolists = res.data
            setTodolists(todolists)
            todolists.forEach((tl) => {
                axios.get<GetTasksResponse>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${tl.id}/tasks`, {
                    headers: {
                        Authorization: 'Bearer 6abad6d5-ca67-446c-9608-5cdc421e16de',
                        'API-KEY': '20ec9fd3-c1ad-43e9-9a4d-faa6638153bf',
                    },
                }).then((res) => {
                    setTasks((prevState) => {
                        return {...prevState, [tl.id]: res.data.items}
                    })
                })
            })
        })
    }, [])

    const createTodolistHandler = (title: string) => {
        axios.post<CreateTodolistResponse>(
            'https://social-network.samuraijs.com/api/1.1/todo-lists',
            {title},
            {
                headers: {
                    Authorization: 'Bearer 6abad6d5-ca67-446c-9608-5cdc421e16de',
                    'API-KEY': '20ec9fd3-c1ad-43e9-9a4d-faa6638153bf',
                },
            }
        )
            .then(res => {
                const newTodolist = res.data.data.item
                setTodolists([newTodolist, ...todolists])
            })
    }

    const removeTodolistHandler = (id: string) => {
        axios.delete<DeleteTodolistResponse>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`, {
            headers: {
                Authorization: 'Bearer 6abad6d5-ca67-446c-9608-5cdc421e16de',
                'API-KEY': '20ec9fd3-c1ad-43e9-9a4d-faa6638153bf',
            },
        })
            .then(() => {
                const newTodolists = todolists.filter((item) => item.id !== id)
                setTodolists(newTodolists)
            })
    }

    const updateTodolistHandler = (id: string, title: string) => {
        axios.put<UpdateTodolistResponse>(
            `https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`,
            {title},
            {
                headers: {
                    Authorization: 'Bearer 6abad6d5-ca67-446c-9608-5cdc421e16de',
                    'API-KEY': '20ec9fd3-c1ad-43e9-9a4d-faa6638153bf',
                },
            }
        )
            .then(() => {
                const newTodolists = todolists.map((item) => item.id === id ? {...item, title} : item)
                setTodolists(newTodolists)
            })
    }

    const createTaskHandler = (title: string, todolistId: string) => {
        axios.post<CreateTaskResponse>(
            `https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks`,
            {title},
            {
                headers: {
                    Authorization: 'Bearer 6abad6d5-ca67-446c-9608-5cdc421e16de',
                    'API-KEY': '20ec9fd3-c1ad-43e9-9a4d-faa6638153bf',
                },
            }
        )
            .then(res => {
                const newTask = res.data.data.item;
                const todolistsTasks = tasks[todolistId] || [];
                setTasks({...tasks, [todolistId]: [newTask, ...todolistsTasks]})
            })
    }

    const removeTaskHandler = (taskId: string, todolistId: string) => {
        axios.delete<DeleteTaskResponse>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks/${taskId}`, {
            headers: {
                Authorization: 'Bearer 6abad6d5-ca67-446c-9608-5cdc421e16de',
                'API-KEY': '20ec9fd3-c1ad-43e9-9a4d-faa6638153bf',
            },
        })
            .then(() => {
                setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)})
            })
    }

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>, task: DomainTask) => {

        let status = e.currentTarget.checked ? 2 : 0;

        const model: UpdateTaskModel = {
            status,
            title: task.title,
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate
        }

        axios.put<UpdateTaskResponse>(
            `https://social-network.samuraijs.com/api/1.1/todo-lists/${task.todoListId}/tasks/${task.id}`,
            model,
            {
                headers: {
                    Authorization: 'Bearer 6abad6d5-ca67-446c-9608-5cdc421e16de',
                    'API-KEY': '20ec9fd3-c1ad-43e9-9a4d-faa6638153bf',
                },
            }
        )
            .then(() => {
                const newTasks = tasks[task.todoListId].map(t => t.id === task.id ? {...t, ...model} : t)
                setTasks({...tasks, [task.todoListId]: newTasks})
            })
    }

    const changeTaskTitleHandler = (title: string, task: DomainTask) => {

        const model: UpdateTaskModel = {
            status: task.status,
            title,
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate
        }

        axios.put<UpdateTaskResponse>(
            `https://social-network.samuraijs.com/api/1.1/todo-lists/${task.todoListId}/tasks/${task.id}`,
            model,
            {
                headers: {
                    Authorization: 'Bearer 6abad6d5-ca67-446c-9608-5cdc421e16de',
                    'API-KEY': '20ec9fd3-c1ad-43e9-9a4d-faa6638153bf',
                },
            }
        )
            .then(() => {
                const newTasks = tasks[task.todoListId].map(t => t.id === task.id ? {...t, ...model} : t)
                setTasks({...tasks, [task.todoListId]: newTasks})
            })
    }

    return (
        <div style={{margin: '20px'}}>
            <AddItemForm addItem={createTodolistHandler}/>

            {/* Todolists */}
            {todolists.map((tl) => {
                return (
                    <div key={tl.id} style={todolist}>
                        <div>
                            <EditableSpan
                                oldTitle={tl.title}
                                updateTitle={(title: string) => updateTodolistHandler(tl.id, title)}
                            />
                            <button onClick={() => removeTodolistHandler(tl.id)}>x</button>
                        </div>
                        <AddItemForm addItem={title => createTaskHandler(title, tl.id)}/>

                        {/* Tasks */}
                        {!!tasks[tl.id] &&
                            tasks[tl.id].map((task: DomainTask) => {
                                return (
                                    <div key={task.id}>
                                        <Checkbox
                                            checked={task.status === 2}
                                            onChange={e => changeTaskStatusHandler(e, task)}
                                        />
                                        <EditableSpan
                                            oldTitle={task.title}
                                            updateTitle={(title: string) => changeTaskTitleHandler(title, task)}
                                        />
                                        <button onClick={() => removeTaskHandler(task.id, tl.id)}>x</button>
                                    </div>
                                )
                            })}
                    </div>
                )
            })}
        </div>
    )
}

// Styles
const todolist: React.CSSProperties = {
    border: '1px solid black',
    margin: '20px 0',
    padding: '10px',
    width: '300px',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
}
