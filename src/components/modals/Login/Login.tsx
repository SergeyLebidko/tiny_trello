import React from 'react';
import './Login.scss';

type LoginProps = {
    closeHandler: () => void
}

const Login: React.FC<LoginProps> = ({closeHandler}) => {
    return (
        <div className="login">
            <div className="login__content">
                <h1>Введите учетные данные</h1>
                <div>
                    <button onClick={closeHandler}>Отмена</button>
                    <button>Войти</button>
                </div>
            </div>
        </div>
    );
}

export default Login;