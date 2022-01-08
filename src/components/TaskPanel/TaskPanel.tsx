import React, {useRef, useState} from 'react';
import {Importance, Task} from '../../store/task/types';
import {Card} from '../../store/card/types';
import {patchTask, removeTask} from '../../store/task/actions';
import {useDispatch} from 'react-redux';
import Confirm from '../modals/Confirm/Confirm';
import {useImage} from '../../utils/hooks';
import {getDateParts} from '../../utils/common';
import './TaskPanel.scss';

type TaskPanelProps = {
    task: Task,
    card: Card,
    dragOver: (e: React.DragEvent<HTMLLIElement>) => void,
    dragLeave: (e: React.DragEvent<HTMLLIElement>) => void,
    dragEnd: (e: React.DragEvent<HTMLLIElement>) => void,
    dragStart: (e: React.DragEvent<HTMLLIElement>, card: Card, task: Task) => void,
    drop: (e: React.DragEvent<HTMLLIElement>) => void,
    dragEnter: (e: React.DragEvent<HTMLLIElement>, card: Card, task: Task) => void,
}

const TaskPanel: React.FC<TaskPanelProps> = (props) => {
    const {task, card, dragOver, dragLeave, dragEnd, dragStart, drop, dragEnter} = props;
    const dispatch = useDispatch();
    const {icons} = useImage();
    const parentElem = useRef<HTMLLIElement>(null);

    const IMPORTANCE_TEXT_SELECTOR = {
        [Importance.Low]: <span className="taskPanel__text_low">Низкая</span>,
        [Importance.Medium]: <span className="taskPanel__text_medium">Средняя</span>,
        [Importance.High]: <span className="taskPanel__text_high">Высокая</span>
    }

    const NEXT_IMPORTANCE_SELECTOR = {
        [Importance.Low]: Importance.Medium,
        [Importance.Medium]: Importance.High,
        [Importance.High]: Importance.Low
    }

    const [hasShowConfirmModal, setHasShowConfirmModal] = useState<boolean>(false);
    const openConfirmModal = (): void => setHasShowConfirmModal(true);
    const closeConfirmModal = (): void => setHasShowConfirmModal(false);

    const getFormattedDate = (timestamp: number): string => {
        const [d, m, y] = getDateParts(timestamp);
        return `${d}.${m}.${y}`;
    }

    // Анимация при удаление Task
    const removeTaskHandler = (e: any, task: Task): void => {
        closeConfirmModal();
        parentElem.current?.classList.add('animation_delete');
        setTimeout(() => dispatch(removeTask(task)), 400);
    }

    const changeDoneHandler = (): void => {
        dispatch(patchTask({
            ...task,
            done: !task.done
        }));
    }

    const changeImportanceHandler = (): void => {
        dispatch(patchTask({
            ...task,
            importance: NEXT_IMPORTANCE_SELECTOR[task.importance]
        }))
    }

    const {text, done, importance, deadline} = task;
    return (
        <li className="taskPanel"
            ref={parentElem}
            draggable={true}
            onDragOver={dragOver}
            onDragLeave={dragLeave}
            onDragEnd={dragEnd}
            onDragStart={(e: React.DragEvent<HTMLLIElement>) => dragStart(e, card, task)}
            onDrop={drop}
            onDragEnter={(e: React.DragEvent<HTMLLIElement>) => dragEnter(e, card, task)}
        >
            {hasShowConfirmModal &&
            <Confirm
                text={`Удалить задачу "${text}"?`}
                buttonLabel={'Удалить'}
                cancelHandler={closeConfirmModal}
                acceptHandler={() => removeTaskHandler(event, task)}
            />}
            <button className="taskPanel__btn_delete" onClick={openConfirmModal}>
                <img
                    className="taskPanel__icon_delete"
                    src={icons.iconRemoveTask}
                    alt="delete"
                />
            </button>
            <p className="taskPanel__name">{text}</p>
            <p className={done ? "taskPanel__done" : "taskPanel__notDone"} onClick={changeDoneHandler}>
                {done ? "Выполнено" : "Не выполнено"}
            </p>
            <p className="taskPanel__text_block">
                <div>Важность</div>
                <div onClick={changeImportanceHandler} style={{cursor: 'pointer'}}>
                    {IMPORTANCE_TEXT_SELECTOR[importance]}
                </div>
            </p>
            <p className="taskPanel__text_block">
                <div>Срок</div>
                <div>{getFormattedDate(deadline)}</div>
            </p>
        </li>
    );
};

export default TaskPanel;