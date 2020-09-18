import React from 'react';
import Task from './Task';
import arrowImg from '../assets/arrow.svg';
import { ITask } from './Main'

interface ITableProps {
    tasks: ITask[],
    remove(task: ITask): void,
    save(task: ITask): void
}

export default function Table(props: ITableProps) {

    return (
        <div className="task-table">
            <table className="table table-borderless">
                {!!props.tasks.length && (
                    <thead>
                        <tr>
                            <th>Id <img src={arrowImg} alt="arrow" /></th>
                            <th>Name <img src={arrowImg} alt="arrow" /></th>
                            <th>Date <img src={arrowImg} alt="arrow" /></th>
                            <th>no data</th>
                        </tr>
                    </thead>
                )}

                {!props.tasks.length && (
                    <h5>no buisnes means no problem...</h5>
                )}
                <tbody>
                    {props.tasks.map((task: ITask) => (
                        <Task task={task} key={task.uid} remove={props.remove} save={props.save}></Task>
                    ))}
                </tbody>

            </table>


        </div>
    )
}