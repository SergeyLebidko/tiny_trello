import React, {useRef, useState} from 'react';
import {createRandomString} from '../../../utils/common';
import {ALL_LETTERS, DIGITS, PASSWORD_MIN_LEN} from '../../../constants/settings';
import {useImage, useModalError} from '../../../utils/hooks';
import {useDispatch} from 'react-redux';
import {registerUserAction} from '../../../store/user/actions';
import './Register.scss';

type RegisterProps = {
    closeHandler: () => void
    removeOverflowHidden: () => void
}

const Register: React.FC<RegisterProps> = ({closeHandler, removeOverflowHidden}) => {
    const dispatch = useDispatch();
    const { modalImg, icons } = useImage();

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
            className="register__btn_return" 
            onClick={() => {closeHandler(); removeOverflowHidden()}}
        >
            <img src={icons.iconReturn} alt="back"/>
        </button>                    
        <img className="register__logo" src={modalImg.modalHeaderLogo} alt="logo" />

        <div className="register__content">
            {error && <p className="register__danger">{error}</p>}
            <p className="register__content_logo">Зарегистрировать аккаунт</p>
                <div className="register__form">
                    <input 
                        className="register__inp" 
                        placeholder="Укажите Логин" 
                        id={loginId} ref={loginRef}
                    />                    
                    <input 
                        className="register__inp"
                        placeholder="Имя" 
                        id={firstNameId} 
                        ref={firstNameRef}
                    />
                    <input 
                        className="register__inp"
                        placeholder="Фамилия"
                        id={lastNameId} 
                        ref={lastNameRef}
                    />
                    <button className="register__btn_create_pass" onClick={createPasswordHandler}>Создать пароль</button>
                    <div className="register__password_block">
                        <input className="register__password_inp" 
                            placeholder="Укажите пароль" 
                            id={password1Id} 
                            ref={password1Ref} 
                            type={showPassword ? 'text' : 'password'}
                        />
                        <img 
                            className="register__password_look"
                            src={showPassword ? icons.iconShow : icons.iconHide} 
                            alt="show/hide-pass" 
                            onClick={showPasswordHandler}
                        />                            
                    </div>
                    <div className="register__password_block">
                        <input className="register__password_inp" 
                            placeholder="Укажите пароль" 
                            id={password2Id} 
                            ref={password2Ref} 
                            type={showPassword ? 'text' : 'password'}
                        />
                        <img 
                            className="register__password_look"
                            src={showPassword ? icons.iconShow : icons.iconHide} 
                            alt="show/hide-pass" 
                            onClick={showPasswordHandler}
                        />                            
                    </div> 
                    <div className="register__conditions">
                        <span>Регистрируясь, вы подтверждаете, что принимаете наши</span>
                        <span>
                            <a className="register__link" href="">Условия использования</a> и<br/> <a className="register__link" href="">Политику конфиденциальности</a>
                        </span>                        
                    </div>                     
                    
                                        
                    <button className="register__btn_submit" onClick={registerHandler}>Регистрация</button>
                </div>                
                
            <p className="register__or">ИЛИ</p>

            <button className="register__btn_out">
                <img className="register__btn_img" src={icons.iconGoogle} alt="google" />
                <span className="register__btn_text">Войти через Google</span>
            </button>
            <button className="register__btn_out">
                <img className="register__btn_img" src={icons.iconMs} alt="ms" />
                <span className="register__btn_text">Войти через Microsoft</span>
            </button>
            <button className="register__btn_out">
                <img className="register__btn_img" src={icons.iconApple} alt="apple" />
                <span className="register__btn_text">Войти через Apple</span>
            </button>            
        </div>

        <div className="register__lang">
            <img src={modalImg.input} alt="lang" />
        </div>

        <div className="register__footer">
            <img className="register__footer_img" src={modalImg.modalFooterLogo} alt="Atlassian" />
            <ul className="register__footer_list">
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

        <img className="register__footer_img_left" src={modalImg.modalFooterLeft} alt="bg-l" />
        <img className="register__footer_img_right" src={modalImg.modalFooterRight} alt="bg-r" />
        </div>
    );
}

export default Register;