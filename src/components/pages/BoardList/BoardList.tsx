import React, {useRef, useState} from 'react';
import {getBoards, getLoggedUser, useTypedSelector} from '../../../store/selectors';
import {useDispatch} from 'react-redux';
import {createBoard, patchBoard, removeBoard} from '../../../store/board/actions';
import {Board} from '../../../store/board/types';
import BoardItem from "../../BoardItem/BoardItem";
import { useImage } from '../../../utils/hooks';
import { Link } from 'react-router-dom';
import './BoardList.scss';

const BoardList: React.FC = () => {
    const dispatch = useDispatch();
    const { icons } = useImage();

    const loggedUser = useTypedSelector(getLoggedUser);
    const boards = useTypedSelector(getBoards);
    const [edit,setEdit] = useState<boolean>(false)
    const inputRef = useRef<HTMLInputElement>(null)

    // Функция удаления доску
    const removeBoardHandler = (board: Board): void => {
        dispatch(removeBoard(board));
    }

    // Функция изменения названия доску
    const renameBoardHandler = (board: Board): void => {
        dispatch(patchBoard(board));
    }

    // Функция добавления доску
    const addBoardHandler = (): void => {
        if (!loggedUser || !inputRef.current) return;
        if (loggedUser.id) {
            dispatch(createBoard({
                userId: loggedUser.id,
                title: inputRef.current.value,
            }));
            setEdit(!edit)
        }
    }

    // Захват события нажатия Enter
    const getTitleEnter = (e: React.KeyboardEvent<HTMLInputElement>): void => {
        if (e.code === 'Enter') {
            addBoardHandler();
            setEdit(!edit);
        }
    }

    return (
        loggedUser ? (
            <div className="boardList">
                <div className="boardList__header">
                    
                    <div className="boardList__header_block">
                        <div className="boardList__header_left">
                            <div className="boardList__header_left_item"></div>
                        </div>
                        <div className="boardList__header_middle">
                            <div className="boardList__header__triangle_left"></div>
                            <div className="boardList__header__triangle_right"></div>
                            <Link className="boardList__logo" to="/">Tiny-trello</Link>
                            <div className="boardList__user">
                                <p>{loggedUser.firstName} {loggedUser.lastName} :</p>
                                <p>Список досок</p>
                            </div>
                        </div>
                        <div className="boardList__header_right">
                            <div className="boardList__header_right_item"></div>
                        </div>                       
                    </div>
                </div>
                
                <ul className="boardList__content" style={{display: 'inline-flex'}}>
                    {boards.map((board) =>
                        <BoardItem
                            key={board.id}
                            board={board}
                            remove={() => removeBoardHandler(board)}
                            rename={renameBoardHandler}
        
                        />)
                    }
                    {/*Переключатель режима создания доски*/}
                    { edit?
                        <li className="boardItem">
                            <p className="boardItem__logo">Введите название доски</p>
                            <input 
                                className="boardItem__name"
                                type="text"
                                ref={inputRef} 
                                autoFocus 
                                onKeyDown={getTitleEnter}
                            />
                            <button 
                                className="boardItem__btn_confirm"
                                onClick={addBoardHandler}
                            >
                                <img 
                                    className="boardItem__icon_confirm"
                                    src={icons.iconConfirm} 
                                    alt="confirm" 
                                />
                            </button>
                            <button 
                                onClick={() => setEdit(!edit)}
                                className="boardItem__btn_cancel"
                            >
                                <img 
                                    className="boardItem__icon_cancel"
                                    src={icons.iconRemove} 
                                    alt="cancel" 
                                />
                            </button>
                        </li>

                        :
                        <li className="boardList__list_btn_block" onClick={() => setEdit(!edit)}> 
                            <img                                
                                className="boardList__btn_add"
                                src={icons.iconAdd} 
                                alt="add" 
                            />
                        </li>
                    }
                </ul>

                <footer className="boardList__footer">Свои предложения по развитию сайта и переводу присылайте на почту kk309@mail.ru</footer>              
            </div>
        )
        : null
    )
}

export default BoardList;