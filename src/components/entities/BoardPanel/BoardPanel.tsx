import React, {FC, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Board} from '../../../store/board/types';
import {useImage} from '../../../utils/hooks';
import {useDispatch} from 'react-redux';
import {removeBoard} from '../../../store/board/actions';
import ObjectEditTitleForm from '../../forms/ObjectEditTitleForm/ObjectEditTitleForm';
import './BoardPanel.scss';
import {BOARD_TITLE_MAX_LEN} from "../../../constants/settings";

interface IBoardPanel {
    board: Board
}

const BoardPanel: FC<IBoardPanel> = ({board}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [hasEditForm, setHasEditForm] = useState<boolean>(false);
    const closeEditForm = (): void => setHasEditForm(false);
    const openEditForm = (e: React.MouseEvent<HTMLParagraphElement>): void => {
        e.stopPropagation();
        setHasEditForm(true);
    }

    const {icons} = useImage();

    const removeBoardHandler = (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.stopPropagation();
        e.currentTarget.parentElement?.classList.add('animation_delete')
        setTimeout(() => dispatch(removeBoard(board)), 300);
    }

    const panelClickHandler = (): void => navigate(`/board/${board.id}`);

    return (
        <li className='boardItem' onClick={panelClickHandler}>
            {hasEditForm
                ? <ObjectEditTitleForm object={board} maxLen={BOARD_TITLE_MAX_LEN} closeHandler={closeEditForm}/>
                :
                <>
                    <button className='boardItem__btn_remove' onClick={removeBoardHandler}>
                        <img
                            className='boardItem__icon_remove'
                            src={icons.iconRemove}
                            alt='remove'
                        />
                    </button>
                    <p className='boardItem__name' onClick={openEditForm}>{board.title}</p>
                </>
            }
        </li>
    );
};

export default BoardPanel;