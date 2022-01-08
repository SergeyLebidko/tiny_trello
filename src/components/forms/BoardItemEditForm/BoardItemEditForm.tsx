import React, {useRef} from 'react';
import {Board} from '../../../store/board/types';
import './BoardItemEditForm.scss';

type BoardItemEditFormProps = {
    board: Board
    rename: (board: Board) => void
    closeHandler: () => void
}

const BoardItemEditForm: React.FC<BoardItemEditFormProps> = ({board, rename, closeHandler}) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const executeRename = (): void => {
        if (inputRef.current !== null) {
            rename({
                ...board,
                title: inputRef.current.value,
            });
            closeHandler();
        }
    }

    // При получении фокуса - выделяем текст в поле ввода
    const focusHandler = (): void => {
        if (inputRef.current) inputRef.current.select();
    }

    // При потере фокуса - сразу же переименовываем элемент (доску)
    const blurHandler = (): void => {
        executeRename();
    }

    // Перехватываем нажатие Enter и сразу же переименовываем доску
    const keyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>): void => {
        if (e.code === 'Enter') {
            executeRename();
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