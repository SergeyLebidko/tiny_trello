import React, {FC, useState} from 'react';
import {Link} from "react-router-dom";
import {Board} from "../../store/board/types";
import { useImage } from '../../utils/hooks';
import './BoardItem.scss';

interface IBoardItem {
    board: Board,
    remove: () => void,
    rename: (board: Board) => void,
}

const BoardItem: FC<IBoardItem> = ({board, remove, rename}) => {
    const [edit, setEdit] = useState<boolean>(false);
    const { icons } = useImage();

    // Анимация при удаление Board
    const onclickHandler = (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.currentTarget.parentElement?.classList.add('animation_delete')
        setTimeout(() => remove(), 300);
    }

    // Автовыделение
    const selectTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.currentTarget.select()
    }

    // Если теряем фокус, срабатывает событие
    const getTitle = (e: React.FocusEvent<HTMLInputElement>): void => {
        rename(
            {
                ...board,
                title: e.currentTarget.value,
            }
        )
        setEdit(!edit)
    }
    // Если нажимаем Enter, срабатывает событие
    const getTitleEnter = (e: React.KeyboardEvent<HTMLInputElement>): void => {

        if (e.code === 'Enter') {
            rename(
                {
                    ...board,
                    title: e.currentTarget.value,
                }
            )
            setEdit(!edit)
        }
    }

    return (        
        <li className="boardItem">
            {/*Здесь мы переключаем режим изменения названия доски*/}
            {edit
                ? <input
                    className="boardItem__name"
                    type="text"
                    autoFocus
                    defaultValue={board.title}
                    onFocus={selectTitle}
                    onBlur={getTitle}
                    onKeyDown={getTitleEnter}
                />
                : <p 
                    className="boardItem__name"                    
                >
                    {board.title}
                    <img 
                        className="boardItem__btn_edit"
                        onClick={() => setEdit(!edit)}
                        src={icons.iconEdit} 
                        alt="edit" 
                    />
                </p>
            }
            <button 
                className="boardItem__btn_remove"
                onClick={onclickHandler} 
            >
                <img 
                    className="boardItem__icon_remove"
                    src={icons.iconRemove} 
                    alt="remove" 
                />
            </button>
            {/* {modalMode === ModalMode.ConfirmModal && <Confirm closeHandler={closeModal}/>} */}
            <Link className="boardItem__link" to={`/board/${board.id}`}>
                <img
                    className="boardItem__icon_up" 
                    src={icons.iconUp} 
                    alt="go" 
                />
            </Link>
        </li>
    );
};

export default BoardItem;