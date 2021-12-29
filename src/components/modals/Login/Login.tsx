import React, {useRef, useState} from 'react';
import {createRandomString} from '../../../utils/common';
import {useModalError} from '../../../utils/hooks';
import {useDispatch} from "react-redux";
import {checkUserAction} from "../../../store/user/actions";

type LoginProps = {
    closeHandler: () => void
    removeOverflowHidden: () => void
}

const Login: React.FC<LoginProps> = ({closeHandler, removeOverflowHidden}) => {
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

        // Сделал проверку данных!!!
        dispatch(checkUserAction(login,password));

        // После выполнения входа - закрываем модалку
        closeHandler();
    }

    return (
        <div className="login">
            <button 
                className="back" 
                onClick={() => {closeHandler(); removeOverflowHidden()}}
            >
                <img src="icons/back.svg" alt="back"/>
            </button>                    
            <img className="login-logo" src="img/login-logo.png" alt="logo" />

            <div className="login-content">
                {error && <p className="login-danger">{error}</p>}
                <h1>Вход в Trello</h1>
                    <div className="login-form">
                        <input className="inp-login" 
                            placeholder="Укажите адрес электронной почты" 
                            id={loginId} ref={loginRef} 
                        />                
                            
                        <div className="password-wrap">
                            <input className="inp-password" 
                                placeholder="Введите пароль" 
                                id={passwordId} 
                                ref={passwordRef} 
                                type={showPassword ? 'text' : 'password'}
                            />                            
                        </div>
                        <button className="submit-login" onClick={loginHandler}>Войти</button>
                    </div>                
                    
                <p>ИЛИ</p>

                <button className="btn-login-out">
                    <img src="icons/google-logo.png" alt="google" />
                    <span>Войти через Google</span>
                </button>
                <button className="btn-login-out">
                    <img src="icons/ms-logo.png" alt="ms" />
                    <span>Войти через Microsoft</span>
                </button>
                <button className="btn-login-out">
                    <img src="icons/apple-logo.png" alt="apple" />
                    <span>Войти через Apple</span>
                </button>

                <div className="sso">
                    <a href="#">Вход с помощью SSO</a>
                </div>
                
                <div className="issue">
                    <a href="#">Не удается войти?</a> <span>·</span> <a href="#">Зарегистрировать аккаунт</a>
                </div>
            </div>

            <div className="policy">
                <a href="#">Политика конфиденциальности</a> <span>·</span> <a href="#">Условия использования</a>
            </div>

            <div className="inp-lang">
                <img src="img/input-img.png" alt="lang" />
            </div>

            <div className="login-footer">
                <img src="img/login-footer-img.png" alt="Atlassian" />
                <ul className="login-footer-links">
                    <li><a href="#">Шаблоны</a></li>
                    <li><a href="#">Цены</a></li>
                    <li><a href="#">Приложения</a></li>
                    <li><a href="#">Вакансии</a></li>
                    <li><a href="#">Блог</a></li>
                    <li><a href="#">Разработчики</a></li>
                    <li><a href="#">О нас</a></li>
                    <li><a href="#">Помощь</a></li>
                    <li><a href="#">Настройки файлов cookie</a></li>
                </ul>
            </div>
            
            <img className="modal-img-l" src="img/modal-img-l.png" alt="bg-l" />
            <img className="modal-img-r" src="img/modal-img-r.png" alt="bg-r" />
        </div>
    );
}

export default Login;