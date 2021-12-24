import React from 'react';
import {Link} from 'react-router-dom';
import {useTypedSelector} from '../../../store/selectors';
import {ROUTE_PREFIX} from '../../../constants/settings';
import './BoardList.scss';

const BoardList: React.FC = () => {
    const {users} = useTypedSelector(state => state.user)

    return (
        <div>
            <h1>Здесь будет список досок пользователя {users && <>{users[0].firstName} {users[0].lastName}</>}</h1>

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