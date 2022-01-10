import React, {FC, useState} from 'react';
import {Link} from 'react-router-dom';
import {Board} from '../../store/board/types';
import {useImage} from '../../utils/hooks';
import BoardItemEditForm from '../forms/BoardItemEditForm/BoardItemEditForm';
import './BoardItem.scss';

interface IBoardItem {
    board: Board,
    remove: (board: Board) => void,
    rename: (board: Board) => void,
}

const BoardItem: FC<IBoardItem> = ({board, remove, rename}) => {
    const [hasEditForm, setHasEditForm] = useState<boolean>(false);
    const openEditForm = (): void => setHasEditForm(true);
    const closeEditForm = (): void => setHasEditForm(false);

    const {icons} = useImage();

    // Анимация при удаление Board
    const onclickHandler = (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.currentTarget.parentElement?.classList.add('animation_delete')
        setTimeout(() => remove(board), 300);
    }

    return (
        <li className='boardItem'>
            {hasEditForm
                ? <BoardItemEditForm board={board} rename={rename} closeHandler={closeEditForm}/>
                : <p className='boardItem__name' onClick={openEditForm}>{board.title}</p>
            }
            <button className='boardItem__btn_remove' onClick={onclickHandler}>
                <img
                    className='boardItem__icon_remove'
                    src={icons.iconRemove}
                    alt='remove'
                />
            </button>
            <Link className='boardItem__link' to={`/board/${board.id}`}>
                <img
                    className='boardItem__icon_up'
                    src={icons.iconUp}
                    alt='go'
                />
            </Link>
        </li>
    );
};

export default BoardItem;