import React from 'react';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store/store';
import {User} from '../../../store/user/types';
import {getUser} from '../../../store/selectors';
import {ROUTE_PREFIX} from '../../../constants/settings';
import './BoardList.scss';

const BoardList: React.FC = () => {
    const user = useSelector<RootState, User | null>(getUser);

    return (
        <div>
            <h1>Здесь будет список досок пользователя {user && <>{user.firstName} {user.lastName}</>}</h1>

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
    );
}

export default BoardList;