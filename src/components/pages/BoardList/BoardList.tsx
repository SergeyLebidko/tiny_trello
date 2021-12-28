import React, {useRef, useState} from 'react';
import {getBoards, getLoggedUser, useTypedSelector} from '../../../store/selectors';
import {useDispatch} from 'react-redux';
import {createBoard, patchBoard, removeBoard} from '../../../store/board/actions';
import {Board} from '../../../store/board/types';
import './BoardList.scss';
import BoardCard from "../../BoardCard/BoardCard";

const BoardList: React.FC = () => {
    const dispatch = useDispatch();

    const loggedUser = useTypedSelector(getLoggedUser);
    const boards = useTypedSelector(getBoards);
    const [edit,setEdit] = useState<boolean>(false)
    const inputRef = useRef<HTMLInputElement>(null)

    const removeBoardHandler = (board: Board): void => {
        dispatch(removeBoard(board));
    }

    const renameBoardHandler = (board: Board): void => {
        dispatch(patchBoard(board));
    }

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
                            <BoardCard
                                key={board.id}
                                board={board}
                                remove={() => removeBoardHandler(board)}
                                rename={renameBoardHandler}
                            />)
                        }
                        { edit?
                            <li style={{width: 200, height: 100, border: '1px solid black'}}>
                                <p>Введите название доски</p>
                                <input type="text" ref={inputRef} autoFocus onKeyDown={getTitleEnter}/>
                                <button onClick={addBoardHandler}>
                                    Создать доску
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