import React from 'react';
import {useDispatch} from 'react-redux';
import {logoutUserAction} from '../../../store/user/actions';
import './Logout.scss';

type LogoutProps = {
    closeHandler: () => void
}

const Logout: React.FC<LogoutProps> = ({closeHandler}) => {
    const dispatch = useDispatch();

    const exitHandler = (): void => {
        dispatch(logoutUserAction());

        // После выполнения выхода - закрываем модалку
        closeHandler();
    };

    return (
        <div className="logout">
            <div className="logout__content">
                <h1 className="logout__service_title">Tiny Trello</h1>
                <h1 className="logout__modal_title">Вы действительно хотите выйти?</h1>
                <div className="logout__control_block">
                    <button className="button" onClick={closeHandler}>Отмена</button>
                    <button className="button" onClick={exitHandler}>Выйти</button>
                </div>
            </div>
        </div>
    );
}

export default Logout;