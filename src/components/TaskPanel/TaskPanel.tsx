import React from 'react';
import {Importance, Task} from '../../store/task/types';
import './TaskPanel.scss';

const TaskPanel: React.FC<Task> = ({text, done, importance, deadline}) => {

    const IMPORTANCE_TEXT_SELECTOR = {
        [Importance.Low]: 'Не высокая',
        [Importance.Medium]: 'Средняя',
        [Importance.High]: 'Высокая'
    }

    return (
        <li className="task_panel">
            <h1>{text}</h1>
            <h2>{done ? 'Выполнено' : 'Не выполнено'}</h2>
            <h2>Важность: {IMPORTANCE_TEXT_SELECTOR[importance]}</h2>
            <h2>Срок: {deadline}</h2>
        </li>
    );
};

export default TaskPanel;