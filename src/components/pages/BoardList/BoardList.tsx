import React, {useRef, useState} from 'react';
import {getBoards, getLoggedUser, useTypedSelector} from '../../../store/selectors';
import {useDispatch} from 'react-redux';
import {createBoard, patchBoard, removeBoard} from '../../../store/board/actions';
import {Board} from '../../../store/board/types';
import './BoardList.scss';
import BoardItem from "../../BoardItem/BoardItem";

const BoardList: React.FC = () => {
    const dispatch = useDispatch();

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
                <div>
                    <h1>
                        Здесь будет список досок пользователя {loggedUser.firstName} {loggedUser.lastName}
                    </h1>
                    <ul style={{display: 'inline-flex'}}>
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
                            <li style={{width: 200, height: 100, border: '1px solid black'}}>
                                <p>Введите название доски</p>
                                <input type="text" ref={inputRef} autoFocus onKeyDown={getTitleEnter}/>
                                <button onClick={addBoardHandler}>
                                    Создать доску
                                </button>
                                <button
                                    style={{width: 200, border: '1px solid black'}}
                                    onClick={() => setEdit(!edit)}
                                >
                                    Отмена
                                </button>
                            </li>

                            :
                            <li>
                                <button
                                    style={{width: 200, height: 100, border: '1px solid black'}}
                                    onClick={() => setEdit(!edit)}
                                >
                                    Создать доску
                                </button>

                            </li>
                        }
                    </ul>
                </div>
            )
            : null
    )
}

export default BoardList;