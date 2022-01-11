import React, {FC, useState} from 'react';
import {Link} from 'react-router-dom';
import {Board} from '../../store/board/types';
import {useImage} from '../../utils/hooks';
import {useDispatch} from 'react-redux';
import {removeBoard} from '../../store/board/actions';
import ObjectEditTitleForm from '../forms/ObjectEditTitleForm/ObjectEditTitleForm';
import './BoardItem.scss';

interface IBoardItem {
    board: Board
}

const BoardItem: FC<IBoardItem> = ({board}) => {
    const dispatch = useDispatch();
    const [hasEditForm, setHasEditForm] = useState<boolean>(false);
    const openEditForm = (): void => setHasEditForm(true);
    const closeEditForm = (): void => setHasEditForm(false);

    const {icons} = useImage();

    // Анимация при удаление Board
    const onclickHandler = (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.currentTarget.parentElement?.classList.add('animation_delete')
        setTimeout(() => dispatch(removeBoard(board)), 300);
    }

    return (
        <li className='boardItem'>
            {hasEditForm
                ? <ObjectEditTitleForm object={board} closeHandler={closeEditForm}/>
                :
                <>
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
                    <p className='boardItem__name' onClick={openEditForm}>{board.title}</p>
                </>
            }
        </li>
    );
};

export default BoardItem;