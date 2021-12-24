import React from 'react';
import './Logout.scss';

type LogoutProps = {
    closeHandler: () => void
}

const Logout: React.FC<LogoutProps> = ({closeHandler}) => {

    const exitHandler = (): void => {
        // TODO Вставить код удаления пользователя из хранилища redux при выходе из системы
    }

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