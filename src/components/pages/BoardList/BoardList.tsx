import React from 'react';
import {Link} from 'react-router-dom';
import {getBoards, getLoggedUser, useTypedSelector} from '../../../store/selectors';
import {ROUTE_PREFIX} from '../../../constants/settings';
import {useDispatch} from 'react-redux';
import {createBoard, removeBoard} from '../../../store/board/actions';
import {Board} from '../../../store/board/types';
import './BoardList.scss';
import {User} from "../../../store/user/types";

const BoardList: React.FC = () => {
    const dispatch = useDispatch();

    const loggedUser = useTypedSelector(getLoggedUser);
    const boards = useTypedSelector(getBoards);

    const removeBoardHandler = (board: Board): void => {
        dispatch(removeBoard(board));
    }
    const addBoardHandler = (loggedUser: User) : void => {
        if (loggedUser.id) {
            dispatch(createBoard({
                userId: loggedUser.id,
                title: 'Какая-то борда'
            }));
        }
    }

    return (
        loggedUser ? (
            <div>
                <h1>
                    Здесь будет список досок пользователя {loggedUser.firstName} {loggedUser.lastName}
                </h1>
                <ul style={{display:'inline-flex'}}>
                    {boards.map(
                        board =>
                            <li key={board.id} style={{width:200, height:100, border: '1px solid black'}}>
                                <Link to={`/${ROUTE_PREFIX}/board/${board.id}`}>{board.title}</Link>
                                <button onClick={() => removeBoardHandler(board)}>Удалить доску</button>
                            </li>
                    )}
                    <button
                        style={{width:200, height:100, border: '1px solid black'}}
                        onClick={() => addBoardHandler(loggedUser)}
                    >
                        Создать доску
                    </button>
                </ul>
            </div>
            )
            : null
    )
}

export default BoardList;