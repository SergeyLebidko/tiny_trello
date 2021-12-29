import React from 'react';
import {useDispatch} from 'react-redux';
import {logoutUserAction} from '../../../store/user/actions';
import './Logout.scss';

type LogoutProps = {
    closeHandler: () => void
    firstName: string
    lastName: string
}

const Logout: React.FC<LogoutProps> = ({closeHandler, firstName, lastName}) => {
    const dispatch = useDispatch();

    const exitHandler = (): void => {
        dispatch(logoutUserAction());

        // После выполнения выхода - закрываем модалку
        closeHandler();
    };

    return (
        <div className="logout">
            <button 
                className="back" 
                onClick={closeHandler}
            >
                <img src="icons/back.svg" alt="back"/>
            </button>
            <img className="logout-logo" src="img/login-logo.png" alt="logo" />

            <div className="logout-content">
                <h1>Выйти из аккаунта Atlassian</h1>
                <div className="ac-info">
                    <img src="img/ac-logo.png" alt="ac-logo" />
                    <div className="names">
                        <p>{firstName}</p>
                        <p>{lastName}</p>                        
                    </div>
                </div>

                <button className="submit-login" onClick={exitHandler}>Выйти</button>
                <div className="another">
                    <a href="#">Войти в другой аккаунт</a>
                </div>
            </div>

            <div className="policy">
                <a href="#">Политика конфиденциальности</a> <span>·</span> <a href="#">Условия использования</a>
            </div>

            <div className="logout-footer">
                <img src="img/login-footer-img.png" alt="Atlassian" />
                <span>Один аккаунт для Trello, Jira, Confluence и <a href="#">не только</a></span>
            </div>
            <img className="modal-img-l" src="img/modal-img-l.png" alt="bg-l" />
            <img className="modal-img-r" src="img/modal-img-r.png" alt="bg-r" />
        </div>
    );
}

export default Logout;