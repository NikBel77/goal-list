import React from 'react';
import { ITask } from './Table';

interface ITaskProps {
    task: ITask
}

export default function Task(props: ITaskProps) {
    return (
        <div>{ props.task.name }</div>
    )
}