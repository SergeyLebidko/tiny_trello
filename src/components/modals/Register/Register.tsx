import React, {useRef, useState} from 'react';
import {createRandomString} from '../../../utils/common';
import {ALL_LETTERS, DIGITS, PASSWORD_MIN_LEN} from '../../../constants/settings';
import {useModalError} from '../../../utils/hooks';
import {useDispatch} from 'react-redux';
import {registerUserAction} from '../../../store/user/actions';
import './Register.scss';

type RegisterProps = {
    closeHandler: () => void
}

const Register: React.FC<RegisterProps> = ({closeHandler}) => {
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
            <div className="register__content">
                <h1 className="register__service_title">Tiny Trello</h1>
                <h1 className="register__modal_title">Введите данные для регистрации</h1>
                {error && <div className="register__error">{error}</div>}
                <ul>
                    <li className="register__input_item">
                        <label htmlFor={loginId}>Логин:</label>
                        <input className="input" id={loginId} ref={loginRef}/>
                    </li>
                    <li className="register__input_item">
                        <label htmlFor={firstNameId}>Имя:</label>
                        <input className="input" id={firstNameId} ref={firstNameRef}/>
                    </li>
                    <li className="register__input_item">
                        <label htmlFor={lastNameId}>Фамилия:</label>
                        <input className="input" id={lastNameId} ref={lastNameRef}/>
                    </li>
                    <li className="register__input_item">
                        <label htmlFor={password1Id}>Пароль:</label>
                        <input
                            className="input"
                            id={password1Id}
                            ref={password1Ref}
                            type={showPassword ? 'text' : 'password'}
                        />

                    </li>
                    <li className="register__control_item">
                        <span className="register__field_control" onClick={showPasswordHandler}>
                            {showPassword ? 'Скрыть пароль' : 'Показать пароль'}
                        </span>
                        <span className="register__field_control" onClick={createPasswordHandler}>
                            Создать пароль
                        </span>
                    </li>
                    <li className="register__input_item">
                        <label htmlFor={password2Id}>Подтверждение:</label>
                        <input
                            className="input"
                            id={password2Id}
                            ref={password2Ref}
                            type={showPassword ? 'text' : 'password'}
                        />
                    </li>
                </ul>
                <div className="register__control_block">
                    <button className="button" onClick={closeHandler}>Отмена</button>
                    <button className="button" onClick={registerHandler}>Зарегистрироваться</button>
                </div>
            </div>
        </div>
    );
}

export default Register;