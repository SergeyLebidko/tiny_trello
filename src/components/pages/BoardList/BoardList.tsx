import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {getBoards, getLoggedUser, useTypedSelector} from '../../../store/selectors';
import {ROUTE_PREFIX} from '../../../constants/settings';
import './BoardList.scss';

const BoardList: React.FC = () => {
    const loggedUser = useTypedSelector(getLoggedUser);
    const boards = useTypedSelector(getBoards);

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
                        </li>
                )}
            </ul>
        </div>
    );
}

export default BoardList;