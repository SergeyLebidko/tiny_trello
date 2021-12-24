import React from 'react';
import {useDispatch} from 'react-redux';
import {removeUserAction} from '../../../store/user/actions';
import './Logout.scss';

type LogoutProps = {
    closeHandler: () => void
}

const Logout: React.FC<LogoutProps> = ({closeHandler}) => {
    const dispatch = useDispatch();

    const exitHandler = (): void => {
        dispatch(removeUserAction());
    };

    return (
        <div className="logout">
            <div className="logout__content">
                <h1>Вы действительно хотите выйти?</h1>
                <div>
                    <button onClick={closeHandler}>Отмена</button>
                    <button onClick={exitHandler}>Выйти</button>
                </div>
            </div>
        </div>
    );
}

export default Logout;