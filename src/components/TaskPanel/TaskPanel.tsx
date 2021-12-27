import React from 'react';
import {Importance, Task} from '../../store/task/types';
import './TaskPanel.scss';

const TaskPanel: React.FC<Task> = ({text, done, importance, deadline}) => {

    const IMPORTANCE_TEXT_SELECTOR = {
        [Importance.Low]: 'Не высокая',
        [Importance.Medium]: 'Средняя',
        [Importance.High]: 'Высокая'
    }

    const getFormattedDate = (timestamp: number): string => {
        const date = new Date(timestamp);
        const d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        const m = date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
        const y = date.getFullYear();
        return `${d}.${m}.${y}`
    }

    return (
        <li className="task_panel">
            <h1>{text}</h1>
            <h2>{done ? 'Выполнено' : 'Не выполнено'}</h2>
            <h2>Важность: {IMPORTANCE_TEXT_SELECTOR[importance]}</h2>
            <h2>Срок: {getFormattedDate(deadline)}</h2>
        </li>
    );
};

export default TaskPanel;