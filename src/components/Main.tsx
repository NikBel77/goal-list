import React, { useState } from 'react'
import Table from './Table'
import Editor from './Editor'

export interface ITask {
    id: number,
    date: string,
    name: string,
    uid: number
}

const initialTasks: ITask[] = [
    { id: 1, date: new Date().toLocaleDateString(), name: 'first', uid: 1 },
    { id: 2, date: new Date().toLocaleDateString(), name: 'seccond', uid: 2 },
    { id: 3, date: new Date().toLocaleDateString(), name: 'third', uid: 3 }
];

export default function Main() {
    let [tasks, setTasks] = useState(initialTasks);

    let saveTask = (savedTask: ITask) => setTasks(
        [...tasks.filter((task) => savedTask.uid !== task.uid), savedTask]
    )

    let remove = (removedTask: ITask) => setTasks(
        [...tasks.filter((task) => removedTask !== task)]
    );
    return (
        <div>
            <Editor></Editor>
            <Table tasks={tasks} remove={remove} save={saveTask}></Table>
        </div>
    )
}