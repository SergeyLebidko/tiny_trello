import React from 'react';
import {Link} from 'react-router-dom';
import {getUserIndex, useTypedSelector} from '../../../store/selectors';
import {ROUTE_PREFIX} from '../../../constants/settings';
import './BoardList.scss';

const BoardList: React.FC = () => {
    const {users, loggedUser} = useTypedSelector(state => state.user)

    return (
        // Проверка на залогиненного пользователя
        loggedUser ?
            <div>
                <h1>Здесь будет список досок
                    пользователя {users[getUserIndex(users,loggedUser)].firstName} {users[getUserIndex(users,loggedUser)].lastName}</h1>
                {/* Ссылки на несколько досок чисто для примера */}
                <ul>
                    <li>
                        <Link to={`/${ROUTE_PREFIX}/board/12`}>Доска 12</Link>
                    </li>
                    <li>
                        <Link to={`/${ROUTE_PREFIX}/board/15`}>Доска 15</Link>
                    </li>
                    <li>
                        <Link to={`/${ROUTE_PREFIX}/board/8`}>Доска 8</Link>
                    </li>
                </ul>
            </div>
            : null
    );
}

export default BoardList;