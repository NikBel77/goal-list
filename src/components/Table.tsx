import React, { useState } from 'react'
import Task from './Task'
import arrowImg from '../assets/arrow.svg'
import { ITask } from './Main'
import { sortBy, filterByStr } from '../filters'

interface ITableProps {
    tasks: ITask[],
    remove(task: ITask): void,
    edit(task: ITask): void,
    keyWord: string
}

export enum filters {
    id = 'id',
    name = 'name',
    date = 'date',
    empty = 'empry'
}

export default function Table(props: ITableProps) {
    const [filter, setFilter] = useState(filters.empty);
    const [isReverce, setDirection] = useState(false);

    let tasks: ITask[] = props.tasks;

    if (props.keyWord) {
        tasks = filterByStr(tasks, props.keyWord)
    }

    if (filter !== filters.empty) {
        tasks = sortBy(tasks, filter, isReverce);
    }

    let changeFilter = (filterName: filters): void => {
        if(filter === filterName) {
            setDirection(!isReverce)
        } else {
            setDirection(false)
            setFilter(filterName);
        }
    }

    let getArrowPos = (tag: filters): string => {
        if(tag !== filter) return ''
        return isReverce ? 'down' : 'up';
    }

    return (
        <div className="box">
            <table className="table table-borderless">

                <thead>
                    <tr>
                        <th className="row-sm"></th>
                        <th className="row-sm">
                            <button className="btn btn-secondary btn-sm" onClick={() => changeFilter(filters.id)}>
                                <span className="filter-label">#</span>
                                <img src={arrowImg} alt="arrow" className={getArrowPos(filters.id)} />
                            </button>
                        </th>
                        <th className="row-md">
                            <button className="btn btn-secondary btn-sm" onClick={() => changeFilter(filters.name)}>
                                <span className="filter-label">name</span>
                                <img src={arrowImg} alt="arrow" className={getArrowPos(filters.name)} />
                            </button>
                        </th>
                        <th className="row-md">
                            <button className="btn btn-secondary btn-sm" onClick={() => changeFilter(filters.date)}>
                                <span className="filter-label">Date</span>
                                <img src={arrowImg} alt="arrow" className={getArrowPos(filters.date)} />
                            </button>
                        </th>
                        <th className="row-sm"></th>
                    </tr>
                </thead>

                <tbody>
                    {tasks.map((task: ITask) => (
                        <Task task={task} key={task.uid} remove={props.remove} edit={props.edit}></Task>
                    ))}
                </tbody>

            </table>
        </div>
    )
}