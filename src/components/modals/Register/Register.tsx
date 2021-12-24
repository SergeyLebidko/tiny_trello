import React from 'react';
import {createRandomString} from '../../../utils/common';
import './Register.scss';

const Register: React.FC = () => {
    const loginId = createRandomString();
    const firstNameId = createRandomString();
    const lastNameId = createRandomString();
    const password1Id = createRandomString();
    const password2Id = createRandomString();

    return (
        <div className="register">
            <div className="register__content">
                <ul>
                    <li>
                        <label htmlFor={loginId}>Логин:</label>
                        <input id={loginId}/>
                    </li>
                    <li>
                        <label htmlFor={firstNameId}>Имя:</label>
                        <input id={firstNameId}/>
                    </li>
                    <li>
                        <label htmlFor={lastNameId}>Фамилия:</label>
                        <input id={lastNameId}/>
                    </li>
                    <li>
                        <label htmlFor={password1Id}>Пароль:</label>
                        <input id={password1Id} type="password"/>
                    </li>
                    <li>
                        <label htmlFor={password2Id}>Пароль:</label>
                        <input id={password2Id} type="password"/>
                    </li>
                </ul>
                <div>
                    <button>Отмена</button>
                    <button>Зарегистрироваться</button>
                </div>
            </div>
        </div>
    );
}

export default Register;