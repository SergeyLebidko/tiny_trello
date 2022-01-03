import React, {useRef, useState} from 'react';
import {createRandomString} from '../../../utils/common';
import {useModalError} from '../../../utils/hooks';
import {useDispatch} from 'react-redux';
import {loginUserAction} from '../../../store/user/actions';
import './Login.scss';

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

        const login: string = loginRef.current.value;
        const password: string = passwordRef.current.value;

        if (!login || !password) {
            setErrorText('Все поля обязательны к заполнению');
            return;
        }

        const error = dispatch(loginUserAction(login, password));
        if (error !== null) {
            setErrorText(String(error));
            return;
        }

        // Если при выполнении логина не произошло ошибок - закрываем модалку
        closeHandler();
    }

    return (
        <div className="login">
            <button 
                className="login__btn_return" 
                onClick={() => {closeHandler(); removeOverflowHidden()}}
            >
                <img src="icons/back.svg" alt="return"/>
            </button>                    
            <img className="login__logo" src="img/login-logo.png" alt="logo" />

            <div className="login__content">
                {error && <p className="login__danger">{error}</p>}
                <p className="login__content_logo">Вход в Trello</p>
                    <div className="login__form">
                        <input className="login__inp" 
                            placeholder="Укажите адрес электронной почты" 
                            id={loginId} ref={loginRef} 
                        />                
                            
                        <div className="login__password_block">
                            <input className="login__password_inp" 
                                placeholder="Введите пароль" 
                                id={passwordId} 
                                ref={passwordRef} 
                                type={showPassword ? 'text' : 'password'}
                            />
                            <img 
                                className="login__password_look"
                                src={showPassword ? 'icons/show-pass.png' : 'icons/hide-pass.png'} 
                                alt="show/hide-pass" 
                                onClick={showPasswordHandler}
                            />                            
                        </div>
                        <button className="login__btn" onClick={loginHandler}>Войти</button>
                    </div>                
                    
                <p className="login__or">ИЛИ</p>

                <button className="login__btn_out">
                    <img className="login__btn_img" src="icons/google-logo.png" alt="google" />
                    <p className="login__btn_text">Войти через Google</p>
                </button>
                <button className="login__btn_out">
                    <img className="login__btn_img" src="icons/ms-logo.png" alt="ms" />
                    <p className="login__btn_text">Войти через Microsoft</p>
                </button>
                <button className="login__btn_out">
                    <img className="login__btn_img" src="icons/apple-logo.png" alt="apple" />
                    <p className="login__btn_text">Войти через Apple</p>
                </button>

                <div className="login__sso">
                    <a className="login__link" href="#">Вход с помощью SSO</a>
                </div>
                
                <div className="login__issue">
                    <a className="login__link" href="#">Не удается войти?</a> 
                    <span className="login__point">·</span> 
                    <a className="login__link" href="#">Зарегистрировать аккаунт</a>
                </div>
            </div>

            <div className="login__policy">
                <a className="login__link" href="#">Политика конфиденциальности</a> 
                <span className="login__point">·</span> 
                <a className="login__link" href="#">Условия использования</a>
            </div>

            <div className="login__lang">
                <img src="img/input-img.png" alt="lang" />
            </div>

            <div className="login__footer">
                <img className="login__footer_img" src="img/login-footer-img.png" alt="Atlassian" />
                <ul className="login__footer_list">
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
            
            <img className="login__footer_img_left" src="img/modal-img-l.png" alt="bg-l" />
            <img className="login__footer_img_right" src="img/modal-img-r.png" alt="bg-r" />
        </div>
    );
}

export default Login;