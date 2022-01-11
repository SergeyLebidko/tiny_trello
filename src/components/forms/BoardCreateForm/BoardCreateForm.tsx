import React, {useRef} from 'react';
import {createBoard} from '../../../store/board/actions';
import {useDispatch} from 'react-redux';
import {getLoggedUser, useTypedSelector} from '../../../store/selectors';
import {useImage} from '../../../utils/hooks';
import './BoardCreateForm.scss';

type BoardCreateFormProps = {
    closeHandler: () => void
}

const BoardCreateForm: React.FC<BoardCreateFormProps> = ({closeHandler}) => {
    const dispatch = useDispatch();
    const loggedUser = useTypedSelector(getLoggedUser);

    const {icons} = useImage();

    const inputRef = useRef<HTMLInputElement>(null);

    const addBoardHandler = (): void => {
        if (!loggedUser || !inputRef.current) return;
        if (loggedUser.id) {
            dispatch(createBoard({
                userId: loggedUser.id,
                title: inputRef.current.value,
            }));
            closeHandler();
        }
    }

    // Захват события нажатия Enter
    const getTitleEnter = (e: React.KeyboardEvent<HTMLInputElement>): void => {
        if (e.code === 'Enter') {
            addBoardHandler();
        }
    }

    return (
        <li className="boardItem">
            <p className="boardItem__logo">Введите название доски</p>
            <input
                className="boardItem__name"
                type="text"
                ref={inputRef}
                autoFocus
                onKeyDown={getTitleEnter}
            />
            <button className="boardItem__btn_confirm" onClick={addBoardHandler}>
                <img
                    className="boardItem__icon_confirm"
                    src={icons.iconConfirm}
                    alt="confirm"
                />
            </button>
            <button onClick={closeHandler} className="boardItem__btn_cancel">
                <img
                    className="boardItem__icon_cancel"
                    src={icons.iconRemove}
                    alt="cancel"
                />
            </button>
        </li>
    );
}

export default BoardCreateForm;