import React from 'react';
import {Link} from 'react-router-dom';
import {getBoards, getLoggedUser, useTypedSelector} from '../../../store/selectors';
import {ROUTE_PREFIX} from '../../../constants/settings';
import {useDispatch} from 'react-redux';
import {removeBoard} from '../../../store/board/actions';
import {Board} from '../../../store/board/types';
import './BoardList.scss';

const BoardList: React.FC = () => {
    const dispatch = useDispatch();

    const loggedUser = useTypedSelector(getLoggedUser);
    const boards = useTypedSelector(getBoards);

    const removeBoardHandler = (board: Board): void => {
        dispatch(removeBoard(board));
    }

    return (
        <div>
            {loggedUser &&
            <h1>
                Здесь будет список досок пользователя {loggedUser.firstName} {loggedUser.lastName}
            </h1>
            }
            <ul>
                {boards.map(
                    board =>
                        <li key={board.title}>
                            <Link to={`/${ROUTE_PREFIX}/board/${board.id}`}>{board.title}</Link>
                            <button onClick={() => removeBoardHandler(board)}>Удалить доску</button>
                        </li>
                )}
            </ul>
        </div>
    );
}

export default BoardList;