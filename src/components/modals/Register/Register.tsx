import React, {useRef, useState} from 'react';
import {createRandomString} from '../../../utils/common';
import {ALL_LETTERS, DIGITS, PASSWORD_MIN_LEN} from '../../../constants/settings';
import {useModalError} from '../../../utils/hooks';
import {useDispatch} from 'react-redux';
import {registerUserAction} from '../../../store/user/actions';

type RegisterProps = {
    closeHandler: () => void
    removeOverflowHidden: () => void
}

const Register: React.FC<RegisterProps> = ({closeHandler, removeOverflowHidden}) => {
    const dispatch = useDispatch();

    const [showPassword, setShowPassword] = useState<boolean>(false);

    const [error, setErrorText] = useModalError();

    const loginRef = useRef<HTMLInputElement>(null);
    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);
    const password1Ref = useRef<HTMLInputElement>(null);
    const password2Ref = useRef<HTMLInputElement>(null);

    const loginId = createRandomString();
    const firstNameId = createRandomString();
    const lastNameId = createRandomString();
    const password1Id = createRandomString();
    const password2Id = createRandomString();

    const showPasswordHandler = (): void => setShowPassword(oldValue => !oldValue);

    const createPasswordHandler = (): void => {
        if (!password1Ref.current || !password2Ref.current) return;
        setShowPassword(true);
        const password = createRandomString(PASSWORD_MIN_LEN, false);
        password1Ref.current.value = password;
        password2Ref.current.value = password;
    }

    const registerHandler = (): void => {
        if (!loginRef.current || !firstNameRef.current || !lastNameRef.current || !password1Ref.current || !password2Ref.current) return;

        const login = loginRef.current.value.trim();
        const firstName = firstNameRef.current.value.trim();
        const lastName = lastNameRef.current.value.trim();
        const password1 = password1Ref.current.value;
        const password2 = password2Ref.current.value;

        if (![login, firstName, lastName, password1, password2].every(value => !!value)) {
            setErrorText('Все поля обязательны к заполнению');
            return;
        }

        if (DIGITS.includes(login[0])) {
            setErrorText('Логин начинается с цифры');
            return;
        }

        if (login.split('').some(letter => !ALL_LETTERS.includes(letter))) {
            setErrorText('Логин содержит недопустимые символы');
            return;
        }

        if (password1 !== password2) {
            setErrorText('Пароль и подтверждение не совпадают');
            return;
        }

        if (password1.length < PASSWORD_MIN_LEN) {
            setErrorText(`Слишком короткий пароль`);
            return;
        }

        const error = dispatch(registerUserAction({
            login,
            firstName,
            lastName,
            password: password1
        }));
        if (error !== null) {
            setErrorText(String(error));
            return;
        }

        // Если при выполнении регистрации не произошло ошибок - закрываем модалку
        closeHandler();
    }

    return (
        <div className="register">
        <button 
            className="back" 
            onClick={() => {closeHandler(); removeOverflowHidden()}}
        >
            <img src="icons/back.svg" alt="back"/>
        </button>                    
        <img className="register-logo" src="img/login-logo.png" alt="logo" />

        <div className="register-content">
            {error && <p className="register-danger">{error}</p>}
            <h1>Зарегистрировать аккаунт</h1>
                <div className="register-form">
                    <input 
                        className="inp-register" 
                        placeholder="Укажите Логин" 
                        id={loginId} ref={loginRef}
                    />                    
                    <input 
                        className="inp-register"
                        placeholder="Имя" 
                        id={firstNameId} 
                        ref={firstNameRef}
                    />
                    <input 
                        className="inp-register"
                        placeholder="Фамилия"
                        id={lastNameId} 
                        ref={lastNameRef}
                    />
                    <button className="create-pass" onClick={createPasswordHandler}>Создать пароль</button>
                    <div className="password-wrap">
                        <input className="inp-password" 
                            placeholder="Укажите пароль" 
                            id={password1Id} 
                            ref={password1Ref} 
                            type={showPassword ? 'text' : 'password'}
                        />
                        <img 
                            className="show-hide-pass"
                            src={showPassword ? 'icons/show-pass.png' : 'icons/hide-pass.png'} 
                            alt="show/hide-pass" 
                            onClick={showPasswordHandler}
                        />                            
                    </div>
                    <div className="password-wrap">
                        <input className="inp-password" 
                            placeholder="Укажите пароль" 
                            id={password2Id} 
                            ref={password2Ref} 
                            type={showPassword ? 'text' : 'password'}
                        />
                        <img 
                            className="show-hide-pass"
                            src={showPassword ? 'icons/show-pass.png' : 'icons/hide-pass.png'} 
                            alt="show/hide-pass" 
                            onClick={showPasswordHandler}
                        />                            
                    </div> 
                    <div className="conditions">
                        <span>Регистрируясь, вы подтверждаете, что принимаете наши</span>
                        <span><a href="">Условия использования</a> и <a href="">Политику конфиденциальности</a></span>                        
                    </div>                     
                    
                                        
                    <button className="submit-register" onClick={registerHandler}>Регистрация</button>
                </div>                
                
            <p>ИЛИ</p>

            <button className="btn-register-out">
                <img src="icons/google-logo.png" alt="google" />
                <span>Войти через Google</span>
            </button>
            <button className="btn-register-out">
                <img src="icons/ms-logo.png" alt="ms" />
                <span>Войти через Microsoft</span>
            </button>
            <button className="btn-register-out">
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

        <div className="register-footer">
            <img src="img/login-footer-img.png" alt="Atlassian" />
            <ul className="register-footer-links">
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

export default Register;