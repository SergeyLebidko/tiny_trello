import React, {useRef} from 'react';
import {Board} from '../../../store/board/types';
import {useDispatch} from 'react-redux';
import {patchBoard} from '../../../store/board/actions';
import './BoardItemEditForm.scss';

type BoardItemEditFormProps = {
    board: Board
    closeHandler: () => void
}

const BoardItemEditForm: React.FC<BoardItemEditFormProps> = ({board, closeHandler}) => {
    const dispatch = useDispatch();
    const inputRef = useRef<HTMLInputElement>(null);

    const rename = (): void => {
        if (inputRef.current !== null) {
            dispatch(patchBoard({
                ...board,
                title: inputRef.current.value,
            }));
            closeHandler();
        }
    }

    // При получении фокуса - выделяем текст в поле ввода
    const focusHandler = (): void => {
        if (inputRef.current) inputRef.current.select();
    }

    // При потере фокуса - сразу же переименовываем элемент (доску)
    const blurHandler = (): void => {
        rename();
    }

    // Перехватываем нажатие Enter и сразу же переименовываем доску
    const keyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>): void => {
        if (e.code === 'Enter' || e.code === 'NumpadEnter') {
            rename();
        }
    }

    return (
        <input
            className='boardItem__name'
            type='text'
            ref={inputRef}
            autoFocus
            defaultValue={board.title}
            onFocus={focusHandler}
            onBlur={blurHandler}
            onKeyDown={keyDownHandler}
        />
    );
}

export default BoardItemEditForm;