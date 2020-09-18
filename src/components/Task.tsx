import React, { createRef, useState } from 'react';
import { ITask } from './Main';
import removeIcon from '../assets/remove.svg'
import editIcon from '../assets/edit.svg'

interface ITaskProps {
    task: ITask,
    remove(task: ITask): void;
    save(task: ITask): void
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
            date: dateInp.current?.value || '',
            uid: props.task.uid
        }
        props.save(newTask);
        toggleEditor(false)
    }

    if (!editor) return (
        <tr>
            <td>{props.task.id}</td>
            <td>{props.task.name}</td>
            <td>{props.task.date}</td>
            <td>
                <img src={editIcon} alt="edit" onClick={() => toggleEditor(true)} />
            </td>
            <td>
                <img src={removeIcon} alt="remove" onClick={() => props.remove(props.task)} />
            </td>
        </tr>
    )
    else return (
        <tr>
            <td><input type="text" defaultValue={props.task.id} className="edit-inp" ref={idInp} /></td>
            <td><input type="text" defaultValue={props.task.name} className="edit-inp" ref={nameInp} /></td>
            <td><input type="text" defaultValue={props.task.date} className="edit-inp" ref={dateInp} /></td>
            <td>
                <button onClick={edit} >Save</button>
            </td>
        </tr>
    )
}