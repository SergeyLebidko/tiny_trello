import React from 'react';
import {Importance, Task} from '../../store/task/types';
import './TaskPanel.scss';
import {Card} from "../../store/card/types";

type TaskPanelProps = {
    task: Task,
    card: Card,
    removeTaskHandler: (task: Task) => void,
    dragOver: (e:React.DragEvent<HTMLLIElement>) => void,
    dragLeave: (e:React.DragEvent<HTMLLIElement>) => void,
    dragEnd: (e:React.DragEvent<HTMLLIElement>) => void,
    dragStart: (card: Card, task: Task) => void,
    drop: (e:React.DragEvent<HTMLLIElement>) => void,
}

const TaskPanel: React.FC<TaskPanelProps> = ({task, card, removeTaskHandler,dragOver,dragLeave,dragEnd,dragStart,drop}) => {

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

    const {text, done, importance, deadline, order} = task;
    return (
        <li className="task_panel"
            draggable={true}
            onDragOver={dragOver}
            onDragLeave={dragLeave}
            onDragEnd={dragEnd}
            onDragStart={() => dragStart(card,task)}
            onDrop={drop}
        >
            <button className='task_delete' onClick={() => removeTaskHandler(task)}>x</button>
            <h1 className="task_header">{text}</h1>
            <h2>{done ? 'Выполнено' : 'Не выполнено'}</h2>
            <h2>Важность: {IMPORTANCE_TEXT_SELECTOR[importance]}</h2>
            <h2>Срок: {getFormattedDate(deadline)}</h2>
            <p>Очередь {order}</p>
        </li>
    );
};

export default TaskPanel;