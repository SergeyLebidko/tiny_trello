import React from 'react';
import {Importance, Task} from '../../store/task/types';
import './TaskPanel.scss';
import {Card} from "../../store/card/types";
import {Board} from "../../store/board/types";

type TaskPanelProps = {
    task: Task,
    card: Card,
    removeTaskHandler: (task: Task) => void,
    // dragOver: (e: React.DragEvent<HTMLLIElement>, card: Card) => void,
    // dragLeave: (e: React.DragEvent<HTMLLIElement>) => void,
    // dragStart: (e: React.DragEvent<HTMLLIElement>) => void,
    // dragEnd: (e: React.DragEvent<HTMLLIElement>) => void,
    // drop: (e: React.DragEvent<HTMLLIElement>, card: Card) => void,
}

const TaskPanel: React.FC<TaskPanelProps> = ({task, removeTaskHandler, }) => {

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

    const {text, done, importance, deadline} = task;
    return (
        <li className="task_panel"
            draggable={true}
            // onDragOver={dragOver}
            // onDragLeave={dragLeave}
            // onDragStart={dragStart}
            // onDragEnd={dragEnd}
            // onDrop={drop}
        >
            <button onClick={() => removeTaskHandler(task)}>Удалить задачу</button>
            <h1>{text}</h1>
            <h2>{done ? 'Выполнено' : 'Не выполнено'}</h2>
            <h2>Важность: {IMPORTANCE_TEXT_SELECTOR[importance]}</h2>
            <h2>Срок: {getFormattedDate(deadline)}</h2>
        </li>
    );
};

export default TaskPanel;