import React, {useRef, useState} from 'react';
import {createRandomString} from '../../../utils/common';
import {useModalError} from '../../../utils/hooks';
import './Login.scss';
import {useDispatch} from "react-redux";
import {checkUserAction, setUserAction} from "../../../store/user/actions";

type LoginProps = {
    closeHandler: () => void
}

const Login: React.FC<LoginProps> = ({closeHandler}) => {
    const dispatch = useDispatch();

    const [showPassword, setShowPassword] = useState<boolean>(false);

    const [error, setErrorText] = useModalError();

    const loginRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const loginId = createRandomString();
    const passwordId = createRandomString();

    const showPasswordHandler = (): void => setShowPassword(oldValue => !oldValue);

    const loginHandler = (): void => {
        if (!loginRef.current || !passwordRef.current) return;

        const login : string = loginRef.current.value;
        const password : string = passwordRef.current.value;

        if (!login || !password) {
            setErrorText('Все поля обязательны к заполнению');
            return;
        }

        //TODO Вставить код запроса к "серверу" и добавления пользователя в хранилище redux
        // Сейчас - фиктивный код добавлени пользователя, чтобы проверить работу роутов
        dispatch(checkUserAction(login,password));

        // После выполнения входа - закрываем модалку
        closeHandler();
    }

    return (
        <div className="login">
            <div className="login__content">
                <h1>Введите учетные данные</h1>
                {error && <p>{error}</p>}
                <ul>
                    <li>
                        <label htmlFor={loginId}>Логин:</label>
                        <input id={loginId} ref={loginRef}/>
                    </li>
                    <li>
                        <button onClick={showPasswordHandler}>
                            {showPassword ? 'Скрыть пароль' : 'Показать пароль'}
                        </button>
                        <label htmlFor={passwordId}>Пароль:</label>
                        <input id={passwordId} ref={passwordRef} type={showPassword ? 'text' : 'password'}/>
                    </li>
                </ul>
                <div>
                    <button onClick={closeHandler}>Отмена</button>
                    <button onClick={loginHandler}>Войти</button>
                </div>
            </div>
        </div>
    );
}

export default Login;