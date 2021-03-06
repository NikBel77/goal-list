import React, { createRef, useState } from 'react';
import { ITask } from './Main';
import removeIcon from '../assets/remove.svg'
import editIcon from '../assets/edit.svg'

interface ITaskProps {
    task: ITask,
    remove(task: ITask): void;
    edit(task: ITask): void
}

export default function Task(props: ITaskProps) {
    let [editor, toggleEditor] = useState(false);

    const idInp = createRef<HTMLInputElement>();
    const nameInp = createRef<HTMLInputElement>();
    const dateInp = createRef<HTMLInputElement>();

    let edit = () => {
        let id: string = idInp.current?.value || '';
        const newTask: ITask = {
            id: +id || props.task.id,
            name: nameInp.current?.value || '',
            date: dateInp.current?.value || new Date().toLocaleDateString(),
            uid: props.task.uid
        }
        props.edit(newTask);
        toggleEditor(false)
    }

    if (!editor) return (
        <tr className="task">
            <td>
                <button className="btn btn-dark btn-sm btn-table" onClick={() => toggleEditor(true)} >
                    <img src={editIcon} alt="edit" />
                </button>
            </td>
            <td>{props.task.id}</td>
            <td>{props.task.name}</td>
            <td>{new Date(props.task.date).toLocaleDateString()}</td>
            <td className="controll-row">
                <button className="btn btn-danger btn-sm btn-table" onClick={() => props.remove(props.task)} >
                    <img src={removeIcon} alt="remove" />
                </button>
            </td>
        </tr>
    )
    else return (
        <tr className="task">
            <td>
                <button className="btn btn-primary btn-sm btn-table" onClick={edit} >
                    <img src={editIcon} alt="edit" />
                </button>
            </td>
            <td><input type="text" defaultValue={props.task.id} className="inp sm" ref={idInp} /></td>
            <td><input type="text" defaultValue={props.task.name} className="inp md" ref={nameInp} /></td>
            <td colSpan={2}>
                <input type="text" defaultValue={new Date(props.task.date).toDateString()} className="inp lg" ref={dateInp} />
            </td>
        </tr>
    )
}