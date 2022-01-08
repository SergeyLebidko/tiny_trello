import React, {useRef} from 'react';
import {useImage} from '../../../utils/hooks';
import {Board} from '../../../store/board/types';
import {createCard} from '../../../store/card/actions';
import {useDispatch} from 'react-redux';
import {getCards, useTypedSelector} from '../../../store/selectors';
import {getNextOrder} from '../../../utils/common';
import {Card} from '../../../store/card/types';
import './CardCreateForm.scss';

type CardCreateForm = {
    board: Board,
    closeHandler: () => void
}

const CardCreateForm: React.FC<CardCreateForm> = ({board, closeHandler}) => {
    const dispatch = useDispatch();
    const cards = useTypedSelector(getCards);

    const inputRef = useRef<HTMLInputElement>(null);

    const {icons} = useImage();

    const addCardHandler = (): void => {
        if (!inputRef.current) return;
        dispatch(createCard(
            {
                boardId: board.id as number,
                title: inputRef.current.value,
                order: getNextOrder<Card>(cards.filter(card => card.boardId === board.id)),
            }
        ))
        closeHandler();
    }

    return (
        <li className="cardPanel">
            <p className="cardPanel__name">Введите название списка</p>
            <input
                className="cardPanel__inp_name"
                ref={inputRef}
                autoFocus
            />
            <button className="cardPanel__btn_confirm" onClick={addCardHandler}>
                <img
                    className="cardPanel__icon_confirm"
                    src={icons.iconConfirm}
                    alt="confirm"
                />
            </button>
            <button className="cardPanel__btn_cancel" onClick={closeHandler}>
                <img
                    className="cardPanel__icon_cancel"
                    src={icons.iconRemove}
                    alt="cancel"
                />
            </button>
        </li>
    );
}

export default CardCreateForm;