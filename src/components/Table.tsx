import React, { useState } from 'react';
import Task from './Task';
import Filter from './Filter';

export interface ITask {
    id: number,
    date: string,
    name: string,
    uid: number
}

const initialGoals: ITask[] = [
    { id: 1, date: new Date().toLocaleDateString() , name: 'first', uid: 1 },
    { id: 2, date: new Date().toLocaleDateString() , name: 'seccond', uid: 2},
    { id: 3, date: new Date().toLocaleDateString() , name: 'third', uid: 3}
];

export default function Table() {
    let [tasks, setTasks] = useState(initialGoals);

    return (
        <div className="task-table">

            <Filter></Filter>

            {tasks.map((task: ITask) => (
                <Task task={ task } key={ task.uid }></Task>
            ))}
            
        </div>
    )
}