import React, { createRef, useState } from 'react'
import Table from './Table'
import { initialTasks } from '../initialTasks'

export interface ITask {
    id: number,
    date: string,
    name: string,
    uid: number
}

export default function Main() {
    let [tasks, setTasks] = useState(initialTasks);
    let [keyWord, setKeyWord] = useState('');
    let hasContent = !!tasks.length;

    const idInp = createRef<HTMLInputElement>();
    const nameInp = createRef<HTMLInputElement>();
    const dateInp = createRef<HTMLInputElement>();

    let editTask = (savedTask: ITask) => {
        let removed = tasks.find((task) => task.uid === savedTask.uid);
        if (!removed) return
        tasks.splice(tasks.indexOf(removed), 1, savedTask);
        setTasks([...tasks])
    };

    let remove = (removedTask: ITask) => setTasks(
        [...tasks.filter((task) => removedTask !== task)]
    );

    let addNewTask = (): void => {
        if (!nameInp.current?.value) return;
        let date = dateInp.current?.value;
        if (date) date = new Date(date).toString();

        let id: string | number = idInp.current?.value || tasks.length + 1;
        const newTask: ITask = {
            id: +id || tasks.length + 1,
            name: nameInp.current?.value || '',
            date: date || new Date().toString(),
            uid: Date.now()
        }
        setTasks([
            ...tasks, newTask
        ]);

        if (idInp.current?.value) idInp.current.value = '';
        if (dateInp.current?.value) dateInp.current.value = '';
        nameInp.current.value = '';
    }
    return (
        <div className="app__inner">
            <div className="box create-box">
                <h5>Add new Task</h5>

                <div className="create-form">

                    <div className="create-form__fild">
                        <label htmlFor="id"><span>id</span></label>
                        <input type="number" id="id" className="inp" ref={idInp} />
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

            {hasContent && (
                <div className="main-table">
                    <div className="box search-panel">
                        <input
                            className="inp"
                            type="text"
                            onChange={(e) => setKeyWord(e.currentTarget.value)}
                            placeholder="wanna search" />
                    </div>

                    <Table tasks={tasks} remove={remove} edit={editTask} keyWord={keyWord}></Table>
                </div>
            )}

            {!hasContent && (
                <div className="box placeholder">
                    <p>it looks like there is no business now</p>
                    <p>just relax...</p>
                </div>
            )}

        </div>
    )
}