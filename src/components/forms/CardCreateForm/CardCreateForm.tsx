import React, {useRef} from 'react';
import {useError, useImage} from '../../../utils/hooks';
import {Board} from '../../../store/board/types';
import {createCard} from '../../../store/card/actions';
import {useDispatch} from 'react-redux';
import {getCards, useTypedSelector} from '../../../store/selectors';
import {getNextOrder} from '../../../utils/common';
import {Card} from '../../../store/card/types';
import {CARD_TITLE_MAX_LEN} from '../../../constants/settings';
import './CardCreateForm.scss';

type CardCreateForm = {
    board: Board,
    closeHandler: () => void
}

const CardCreateForm: React.FC<CardCreateForm> = ({board, closeHandler}) => {
    const dispatch = useDispatch();

    const [error, setErrorText] = useError();
    const cards = useTypedSelector(getCards);

    const inputRef = useRef<HTMLInputElement>(null);

    const {icons} = useImage();

    const addCardHandler = (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.preventDefault();
        if (!inputRef.current) return;

        const title = inputRef.current.value.trim();
        if (!title) {
            setErrorText('Название не может быть пустым');
            return;
        }
        if(title.length > CARD_TITLE_MAX_LEN) {
            setErrorText(`Максимальная длина названия ${CARD_TITLE_MAX_LEN} символов`);
        }

        dispatch(createCard(
            {
                boardId: board.id as number,
                order: getNextOrder<Card>(cards.filter(card => card.boardId === board.id)),
                title
            }
        ))
        closeHandler();
    }

    const closeFormHandler = (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.preventDefault();
        closeHandler();
    }

    return (
        <form className="cardPanel">
            <p className="cardPanel__name">Введите название списка</p>
            <input
                className="cardPanel__inp_name"
                ref={inputRef}
                autoFocus
            />
            {error && <span>{error}</span>}
            <button className="cardPanel__btn_confirm" onClick={addCardHandler}>
                <img
                    className="cardPanel__icon_confirm"
                    src={icons.iconConfirm}
                    alt="confirm"
                />
            </button>
            <button className="cardPanel__btn_cancel" onClick={closeFormHandler}>
                <img
                    className="cardPanel__icon_cancel"
                    src={icons.iconRemove}
                    alt="cancel"
                />
            </button>
        </form>
    );
}

export default CardCreateForm;