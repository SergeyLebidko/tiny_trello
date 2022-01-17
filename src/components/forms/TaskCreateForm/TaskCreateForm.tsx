import React, {useRef, useState} from 'react';
import {Importance, Task} from '../../../store/task/types';
import {createTask} from '../../../store/task/actions';
import {useDispatch} from 'react-redux';
import {Card} from '../../../store/card/types';
import {useImage} from '../../../utils/hooks';
import {getDateParts, getNextOrder} from '../../../utils/common';
import {getTasks, useTypedSelector} from '../../../store/selectors';
import './TaskCreateForm.scss';

type TaskCreateFormProps = {
    card: Card,
    closeHandler: () => void
}

const TaskCreateForm: React.FC<TaskCreateFormProps> = ({card, closeHandler}) => {
    const dispatch = useDispatch();
    const tasks = useTypedSelector(getTasks);

    const {icons} = useImage();

    const [selected, setSelected] = useState<Importance>(Importance.Low);
    const titleRef = useRef<HTMLInputElement>(null);
    const dateRef = useRef<HTMLInputElement>(null);

    // Получаем дату в текстовом формате, который требует форма
    const getToday = (): string => {
        const [d, m, y] = getDateParts(Date.now());
        return `${y}-${m}-${d}`;
    }

    const changeImportanceHandler = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        setSelected(e.currentTarget.value as Importance);
    }

    const addTaskHandler = (): void => {
        if (!titleRef.current || !dateRef.current) return;
        dispatch(createTask({
            cardId: card.id as number,
            title: titleRef.current.value,
            done: false,
            importance: selected,
            deadline: +new Date(dateRef.current.value),
            order: getNextOrder<Task>(tasks.filter(task => task.cardId === card.id)),
        }))
        closeHandler();
    }

    return (
        <li className="taskPanel">
            <p className="taskPanel__name">Введите текст задачи</p>
            <input className="taskPanel__area" ref={titleRef} autoFocus/>
            <select className="taskPanel__select" value={selected} onChange={changeImportanceHandler}>
                <option value={Importance.Low}>Низкая</option>
                <option value={Importance.Medium}>Средняя</option>
                <option value={Importance.High}>Высокая</option>
            </select>
            <input
                className="taskPanel__date"
                type="date"
                ref={dateRef}
                defaultValue={getToday()}
            />
            <button className="taskPanel__btn_confirm" onClick={addTaskHandler}>
                <img
                    className="taskPanel__icon_confirm"
                    src={icons.iconConfirm}
                    alt="confirm"
                />
            </button>
            <button className="taskPanel__btn_cancel" onClick={closeHandler}>
                <img
                    className="taskPanel__icon_cancel"
                    src={icons.iconCancel}
                    alt="cancel"
                />
            </button>
        </li>
    );
}

export default TaskCreateForm;