import React, {useRef} from 'react';
import {Board} from '../../../store/board/types';
import {Task} from '../../../store/task/types';
import {Card} from '../../../store/card/types';
import {useDispatch} from 'react-redux';
import {patchTask} from '../../../store/task/actions';
import {patchCard} from '../../../store/card/actions';
import {patchBoard} from '../../../store/board/actions';
import {isBoard, isCard, isTask} from '../../../utils/common';
import './ObjectEditTitleForm.scss';

type ObjectEditTitleFormProps = {
    object: Board | Card | Task
    closeHandler: () => void
}

const ObjectEditTitleForm: React.FC<ObjectEditTitleFormProps> = ({object, closeHandler}) => {
    const dispatch = useDispatch();
    const inputRef = useRef<HTMLInputElement>(null);

    const rename = (): void => {
        if (inputRef.current === null) return;
        const title = inputRef.current.value;
        if (isBoard(object)) {
            dispatch(patchBoard({...object, title}));
        }
        if (isCard(object)) {
            dispatch(patchCard({...object, title}));
        }
        if (isTask(object)) {
            dispatch(patchTask({...object, title}));
        }
        closeHandler();
    }

    // При получении фокуса - выделяем текст в поле ввода
    const focusHandler = (): void => {
        if (inputRef.current) inputRef.current.select();
    }

    // При потере фокуса - сразу же переименовываем объект
    const blurHandler = (): void => {
        rename();
    }

    // Перехватываем нажатие Enter и сразу же переименовываем объект. При нажатии на Esc - закрываем форму без применения изменений
    const keyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>): void => {
        if (e.code === 'Enter' || e.code === 'NumpadEnter') {
            rename();
        }
        if (e.code === 'Escape') {
            closeHandler();
        }
    }

    return (
        <input
            className="objectEditTitleForm"
            ref={inputRef}
            autoFocus
            defaultValue={object.title}
            onFocus={focusHandler}
            onBlur={blurHandler}
            onKeyDown={keyDownHandler}
        />
    );
}

export default ObjectEditTitleForm;