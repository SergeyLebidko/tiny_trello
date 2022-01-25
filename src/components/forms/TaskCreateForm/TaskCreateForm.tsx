import React, {useRef, useState} from 'react';
import {Importance, Task} from '../../../store/task/types';
import {createTask} from '../../../store/task/actions';
import {useDispatch} from 'react-redux';
import {Card} from '../../../store/card/types';
import {useError} from '../../../utils/hooks';
import {getDateParts, getNextOrder} from '../../../utils/common';
import {getTasks, useTypedSelector} from '../../../store/selectors';
import './TaskCreateForm.scss';
import {TASK_TITLE_MAX_LEN} from "../../../constants/settings";

// images
import iconConfirm from '../../../content/icons/btn-confirm.svg';
import iconCancel from '../../../content/icons/btn-cancel.svg';

type TaskCreateFormProps = {
    card: Card,
    closeHandler: () => void
}

const TaskCreateForm: React.FC<TaskCreateFormProps> = ({card, closeHandler}) => {
    const dispatch = useDispatch();

    const [titleError, setTitleErrorText] = useError();
    const [deadlineError, setDeadlineErrorText] = useError();
    const tasks = useTypedSelector(getTasks);

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

    const addTaskHandler = (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.preventDefault();
        if (!titleRef.current || !dateRef.current) return;

        const title = titleRef.current.value.trim();
        if (!title) {
            setTitleErrorText('Название не может быть пустым');
            return;
        }
        if (title.length > TASK_TITLE_MAX_LEN) {
            setTitleErrorText(`Максимальная длина названия ${TASK_TITLE_MAX_LEN} символов`);
            return;
        }

        const deadline = new Date(dateRef.current.value).getTime();
        if (isNaN(deadline)) {
            setDeadlineErrorText('Недопустимая дата');
            return;
        }

        dispatch(createTask({
            cardId: card.id as number,
            title,
            deadline,
            done: false,
            importance: selected,
            order: getNextOrder<Task>(tasks.filter(task => task.cardId === card.id)),
        }))
        closeHandler();
    }

    const closeFormHandler = (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.preventDefault();
        closeHandler();
    }

    return (
        <form className="taskPanel">
            <p className="taskPanel__name">Введите текст задачи</p>
            <input className="taskPanel__area" ref={titleRef} autoFocus/>
            {titleError && <span className="taskPanel__danger">{titleError}</span>}
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
            {deadlineError && <span className="taskPanel__danger_date">{deadlineError}</span>}
            <button className="taskPanel__btn_confirm" onClick={addTaskHandler}>
                <img
                    className="taskPanel__icon_confirm"
                    src={iconConfirm}
                    alt="confirm"
                />
            </button>
            <button className="taskPanel__btn_cancel" onClick={closeFormHandler}>
                <img
                    className="taskPanel__icon_cancel"
                    src={iconCancel}
                    alt="cancel"
                />
            </button>
        </form>
    );
}

export default TaskCreateForm;