import React from 'react';
import './Logout.scss';

type LogoutProps = {
    closeHandler: () => void
}

const Logout: React.FC<LogoutProps> = ({closeHandler}) => {
    return (
        <div className="logout">
            <div className="logout__content">
                <h1>Вы действительно хотите выйти?</h1>
                <div>
                    <button onClick={closeHandler}>Отмена</button>
                    <button>Выйти</button>
                </div>
            </div>
        </div>
    );
}

export default Logout;