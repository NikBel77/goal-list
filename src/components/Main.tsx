import React, { createRef, useState } from 'react'
import Table from './Table'

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
    let [keyWord, setKeyWord] = useState('');

    const idInp = createRef<HTMLInputElement>();
    const nameInp = createRef<HTMLInputElement>();
    const dateInp = createRef<HTMLInputElement>();

    let editTask = (savedTask: ITask) => setTasks(
        [...tasks.filter((task) => savedTask.uid !== task.uid), savedTask]
    );

    let remove = (removedTask: ITask) => setTasks(
        [...tasks.filter((task) => removedTask !== task)]
    );

    let addNewTask = (): void => {
        if (!nameInp.current?.value) return;
        let date = dateInp.current?.value;
        if(date) date = new Date(date).toLocaleDateString();

        let id: string | number = idInp.current?.value || tasks.length + 1;
        const newTask: ITask = {
            id: +id || tasks.length + 1,
            name: nameInp.current?.value || '',
            date: date || new Date().toLocaleDateString(),
            uid: Date.now()
        }
        setTasks([
            ...tasks, newTask
        ]);

        if (idInp.current?.value) idInp.current.value = '';
        if(dateInp.current?.value) dateInp.current.value = '';
        nameInp.current.value = '';
    }
    return (
        <div className="app__inner">
            <div className="box create-box">
                <h5>Add new Task</h5>

                <div className="create-form">

                    <div className="create-form__fild">
                        <label htmlFor="id"><span>id</span></label>
                        <input type="text" id="id" className="inp" ref={idInp} />
                    </div>
                    <div className="create-form__fild">
                        <label htmlFor="name"><span>Name</span></label>
                        <input type="text" id="name" className="inp" ref={nameInp} />
                    </div>
                    <div className="create-form__fild">
                        <label htmlFor="date"><span>Date</span></label>
                        <input type="date" id="date" className="inp" ref={dateInp} />
                    </div>

                </div>

                <button type="button" className="btn btn-success" onClick={addNewTask}>Add</button>
            </div>

            <div className="main-table">
                <div className="box">
                    <input
                        type="text"
                        onChange={(e) => setKeyWord(e.currentTarget.value)}
                        placeholder="wanna search" />
                </div>

                <Table tasks={tasks} remove={remove} edit={editTask} keyWord={keyWord}></Table>
            </div>
        </div>
    )
}