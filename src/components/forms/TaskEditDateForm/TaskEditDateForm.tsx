import React, {useRef} from 'react';
import {Task} from '../../../store/task/types';
import {getDateParts} from '../../../utils/common';
import {useDispatch} from 'react-redux';
import {patchTask} from '../../../store/task/actions';
import './TaskEditDateForm.scss';

type TaskEditDateFormProps = {
    task: Task,
    closeHandler: () => void
}

const TaskEditDateForm: React.FC<TaskEditDateFormProps> = ({task, closeHandler}) => {
    const dispatch = useDispatch();
    const inputRef = useRef<HTMLInputElement>(null);

    const changeTaskDate = (): void => {
        if (inputRef.current === null) return;
        dispatch(patchTask({
            ...task,
            deadline: Date.parse(inputRef.current.value)
        }));
        closeHandler();
    }

    const getDefaultValue = (): string => {
        const [d, m, y] = getDateParts(task.deadline);
        return `${y}-${m}-${d}`
    }

    // При потере фокуса - меняем дату
    const blurHandler = (): void => {
        changeTaskDate();
    }

    // При нажатии Enter - меняем дату. При нажатии Esc - закрываем компонент редактирования
    const keyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>): void => {
        if (e.code === 'Enter' || e.code === 'NumpadEnter') {
            changeTaskDate();
        }
        if (e.code === 'Escape') {
            closeHandler();
        }
    }

    return (
        <input
            autoFocus
            type="date"
            ref={inputRef}
            defaultValue={getDefaultValue()}
            onKeyDown={keyDownHandler}
            onBlur={blurHandler}
        />
    );
}

export default TaskEditDateForm;