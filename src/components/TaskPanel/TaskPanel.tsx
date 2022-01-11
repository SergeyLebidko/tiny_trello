import React, {useRef, useState} from 'react';
import {Importance, Task} from '../../store/task/types';
import {Card} from '../../store/card/types';
import ObjectEditTitleForm from '../forms/ObjectEditTitleForm/ObjectEditTitleForm';
import {patchTask, removeTask} from '../../store/task/actions';
import {useDispatch} from 'react-redux';
import Confirm from '../modals/Confirm/Confirm';
import {useImage} from '../../utils/hooks';
import {getDateParts} from '../../utils/common';
import './TaskPanel.scss';
import TaskEditDateForm from "../forms/TaskEditDateForm/TaskEditDateForm";

type TaskPanelProps = {
    task: Task,
    card: Card,
    dragOver: (e: React.DragEvent<HTMLLIElement>) => void,
    dragStart: (e: React.DragEvent<HTMLLIElement>, card: Card, task: Task) => void,
    drop: (e: React.DragEvent<HTMLLIElement>) => void,
    dragEnter: (e: React.DragEvent<HTMLLIElement>, card: Card, task: Task) => void,
}

const TaskPanel: React.FC<TaskPanelProps> = (props) => {
    const {task, card, dragOver, dragStart, drop, dragEnter} = props;
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

    const [hasTitleEdit, setHasTitleEdit] = useState<boolean>(false);
    const openEditTitleForm = (): void => setHasTitleEdit(true);
    const closeEditTitleForm = (): void => setHasTitleEdit(false);

    const [hasDateEdit, setHasDateEdit] = useState<boolean>(false);
    const openEditDateForm = (): void => setHasDateEdit(true);
    const closeEditDateForm = (): void => setHasDateEdit(false);

    const [hasShowConfirmModal, setHasShowConfirmModal] = useState<boolean>(false);
    const openConfirmModal = (): void => setHasShowConfirmModal(true);
    const closeConfirmModal = (): void => setHasShowConfirmModal(false);

    const getFormattedDate = (timestamp: number): string => {
        const [d, m, y] = getDateParts(timestamp);
        return `${d}.${m}.${y}`;
    }

    // Анимация при удаление Task
    const removeTaskHandler = (task: Task): void => {
        closeConfirmModal();
        parentElem.current?.classList.add('animation_delete');
        setTimeout(() => dispatch(removeTask(task)), 400);
    }

    // Обработчик изменения поля "выполнено" при клике по нему
    const changeDoneHandler = (): void => {
        dispatch(patchTask({
            ...task,
            done: !task.done
        }));
    }

    // Обработчик изменения поля "важность" при клике по нему
    const changeImportanceHandler = (): void => {
        dispatch(patchTask({
            ...task,
            importance: NEXT_IMPORTANCE_SELECTOR[task.importance]
        }))
    }

    const {title, done, importance, deadline} = task;
    return (
        <li className="taskPanel"
            ref={parentElem}
            draggable={true}
            onDragOver={dragOver}
            onDragStart={(e: React.DragEvent<HTMLLIElement>) => dragStart(e, card, task)}
            onDrop={drop}
            onDragEnter={(e: React.DragEvent<HTMLLIElement>) => dragEnter(e, card, task)}
        >
            {hasShowConfirmModal &&
            <Confirm
                text={`Удалить задачу "${title}"?`}
                buttonLabel={'Удалить'}
                cancelHandler={closeConfirmModal}
                acceptHandler={() => removeTaskHandler(task)}
            />}

            {/* При редактировании люого элемента - убираем кнопку удаления таски */}
            {(!hasTitleEdit && !hasDateEdit) &&
            <button className="taskPanel__btn_delete" onClick={openConfirmModal}>
                <img
                    className="taskPanel__icon_delete"
                    src={icons.iconRemoveTask}
                    alt="delete"
                />
            </button>
            }

            {hasTitleEdit
                ? <ObjectEditTitleForm object={task} closeHandler={closeEditTitleForm}/>
                : <p className="taskPanel__name" onClick={openEditTitleForm}>{title}</p>
            }

            <p className={done ? "taskPanel__done" : "taskPanel__notDone"} onClick={changeDoneHandler}>
                {done ? "Выполнено" : "Не выполнено"}
            </p>
            <div className="taskPanel__text_block" onClick={changeImportanceHandler}>
                <div>Важность</div>
                <div>
                    {IMPORTANCE_TEXT_SELECTOR[importance]}
                </div>
            </div>
            <div className="taskPanel__text_block" onClick={openEditDateForm}>
                <div>Срок</div>
                {hasDateEdit
                    ? <TaskEditDateForm task={task} closeHandler={closeEditDateForm}/>
                    : <div>{getFormattedDate(deadline)}</div>
                }
            </div>
        </li>
    );
};

export default TaskPanel;