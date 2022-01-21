import React, {useRef} from 'react';
import {Task} from '../../../store/task/types';
import {getDateParts} from '../../../utils/common';
import {useDispatch} from 'react-redux';
import {patchTask} from '../../../store/task/actions';
import {useError} from '../../../utils/hooks';
import './TaskEditDateForm.scss';

type TaskEditDateFormProps = {
    task: Task,
    closeHandler: () => void
}

const TaskEditDateForm: React.FC<TaskEditDateFormProps> = ({task, closeHandler}) => {
    const dispatch = useDispatch();

    const [error, setErrorText] = useError();
    const inputRef = useRef<HTMLInputElement>(null);

    const changeTaskDate = (): void => {
        if (inputRef.current === null) return;

        const deadline = new Date(inputRef.current.value).getTime();
        if (isNaN(deadline)) {
            setErrorText('Недопустимая дата');
            return;
        }

        dispatch(patchTask({
            ...task,
            deadline
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
        <form>
            <input
                className="taskEditDateForm"
                autoFocus
                type="date"
                ref={inputRef}
                defaultValue={getDefaultValue()}
                onKeyDown={keyDownHandler}
                onBlur={blurHandler}
            />
            {error && <span className="taskEditDateForm__danger">{error}</span>}
        </form>
    );
}

export default TaskEditDateForm;