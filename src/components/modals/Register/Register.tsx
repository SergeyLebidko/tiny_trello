import React, {useRef, useState, useEffect} from 'react';
import {createRandomString} from '../../../utils/common';
import {ALL_LETTERS, DIGITS, PASSWORD_MIN_LEN} from '../../../constants/settings';
import './Register.scss';

export type RegisterProps = {
    closeHandler: () => void
}

const Register: React.FC<RegisterProps> = ({closeHandler}) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const [error, setError] = useState<string | null>(null);
    const errorTimer: { current: NodeJS.Timeout | undefined } = useRef();

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

    // Предотвращаем возможное изменение состояния компонента по таймеру, после того как компонент размонтирован
    useEffect(() => {
        return () => {
            if (typeof errorTimer.current !== 'undefined') clearTimeout(errorTimer.current);
        }
    }, []);

    const setErrorText = (text: string): void => {
        setError(text);
        errorTimer.current = setTimeout(() => setError(null), 4000);
    }

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

        // TODO Вставить код отправки данных нового пользователя на "сервер"
    }

    return (
        <div className="register">
            <div className="register__content">
                {error && <p>{error}</p>}
                <ul>
                    <li>
                        <label htmlFor={loginId}>Логин:</label>
                        <input id={loginId} ref={loginRef}/>
                    </li>
                    <li>
                        <label htmlFor={firstNameId}>Имя:</label>
                        <input id={firstNameId} ref={firstNameRef}/>
                    </li>
                    <li>
                        <label htmlFor={lastNameId}>Фамилия:</label>
                        <input id={lastNameId} ref={lastNameRef}/>
                    </li>
                    <li>
                        <button onClick={showPasswordHandler}>
                            {showPassword ? 'Скрыть пароль' : 'Показать пароль'}
                        </button>
                        <button onClick={createPasswordHandler}>Создать пароль</button>
                    </li>
                    <li>
                        <label htmlFor={password1Id}>Пароль:</label>
                        <input id={password1Id} ref={password1Ref} type={showPassword ? 'text' : 'password'}/>
                    </li>
                    <li>
                        <label htmlFor={password2Id}>Пароль:</label>
                        <input id={password2Id} ref={password2Ref} type={showPassword ? 'text' : 'password'}/>
                    </li>
                </ul>
                <div>
                    <button onClick={closeHandler}>Отмена</button>
                    <button onClick={registerHandler}>Зарегистрироваться</button>
                </div>
            </div>
        </div>
    );
}

export default Register;