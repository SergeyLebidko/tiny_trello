import React, {useRef} from 'react';
import {Card} from '../../../store/card/types';
import {useDispatch} from 'react-redux';
import {patchCard} from '../../../store/card/actions';
import './CardTitleEditForm.scss';

type CardTitleEditFormProps = {
    card: Card,
    closeHandler: () => void
}

const CardTitleEditForm: React.FC<CardTitleEditFormProps> = ({card, closeHandler}) => {
    const dispatch = useDispatch();
    const inputRef = useRef<HTMLInputElement>(null);

    const rename = (): void => {
        if (inputRef.current !== null) {
            dispatch(patchCard({
                ...card,
                title: inputRef.current.value,
            }));
            closeHandler();
        }
    }

    // При получении фокуса - выделяем текст в поле ввода
    const focusHandler = (): void => {
        if (inputRef.current) inputRef.current.select();
    }

    // При потере фокуса - сразу же переименовываем элемент (карточку)
    const blurHandler = (): void => {
        rename();
    }

    // Перехватываем нажатие Enter и сразу же переименовываем карточку
    const keyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>): void => {
        if (e.code === 'Enter' || e.code === 'NumpadEnter') {
            rename();
        }
    }

    return (
        <input
            ref={inputRef}
            autoFocus
            defaultValue={card.title}
            onFocus={focusHandler}
            onBlur={blurHandler}
            onKeyDown={keyDownHandler}
        />
    );
}

export default CardTitleEditForm;