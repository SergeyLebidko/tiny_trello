import React, {useRef} from 'react';
import {createBoard} from '../../../store/board/actions';
import {useDispatch} from 'react-redux';
import {getLoggedUser, useTypedSelector} from '../../../store/selectors';
import {useError} from '../../../utils/hooks';
import {BOARD_TITLE_MAX_LEN} from '../../../constants/settings';
import './BoardCreateForm.scss';

// images
import iconConfirm from '../../../content/icons/btn-confirm.svg';
import iconRemove from '../../../content/icons/btn-remove.svg';

type BoardCreateFormProps = {
    closeHandler: () => void
}

const BoardCreateForm: React.FC<BoardCreateFormProps> = ({closeHandler}) => {
    const dispatch = useDispatch();

    const [error, setErrorText] = useError();
    const loggedUser = useTypedSelector(getLoggedUser);

    const inputRef = useRef<HTMLInputElement>(null);

    const addBoardHandler = (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.preventDefault();
        if (!loggedUser || !inputRef.current) return;

        const title = inputRef.current.value.trim();
        if (!title) {
            setErrorText('Название не может быть пустым');
            return;
        }
        if(title.length > BOARD_TITLE_MAX_LEN) {
            setErrorText(`Максимальная длина названия ${BOARD_TITLE_MAX_LEN} символов`);
            return;
        }

        if (loggedUser.id) {
            dispatch(createBoard({
                userId: loggedUser.id,
                title
            }));
        }
        closeHandler();
    }

    const closeFormHandler = (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.preventDefault();
        closeHandler();
    }

    return (
        <form className="boardItem">
            <p className="boardItem__logo">Введите название доски</p>
            <input
                className="boardItem__name"
                ref={inputRef}
                autoFocus
            />
            {error && <span className="boardItem__danger">{error}</span>}
            <button className="boardItem__btn_confirm" onClick={addBoardHandler}>
                <img
                    className="boardItem__icon_confirm"
                    src={iconConfirm}
                    alt="confirm"
                />
            </button>
            <button onClick={closeFormHandler} className="boardItem__btn_cancel">
                <img
                    className="boardItem__icon_cancel"
                    src={iconRemove}
                    alt="cancel"
                />
            </button>
        </form>
    );
}

export default BoardCreateForm;