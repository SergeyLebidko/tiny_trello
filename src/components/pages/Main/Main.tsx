import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import Register from '../../modals/Register/Register';
import Login from '../../modals/Login/Login';
import Logout from '../../modals/Logout/Logout';
import {getLoggedUser, useTypedSelector} from '../../../store/selectors';
import './Main.scss';

enum ModalMode {
    NoModal,
    RegisterModal,
    LoginModal,
    LogoutModal
}

const Main: React.FC = () => {
    const loggedUser = useTypedSelector(getLoggedUser);

    const [modalMode, setModalMode] = useState<ModalMode>(ModalMode.NoModal);

    const showRegister = (): void => setModalMode(ModalMode.RegisterModal);
    const showLogin = (): void => setModalMode(ModalMode.LoginModal);
    const showLogout = (): void => setModalMode(ModalMode.LogoutModal);

    const closeModal = (): void => setModalMode(ModalMode.NoModal);

    return (
        <div className="main">
            {modalMode === ModalMode.RegisterModal && <Register closeHandler={closeModal}/>}
            {modalMode === ModalMode.LoginModal && <Login closeHandler={closeModal}/>}
            {modalMode === ModalMode.LogoutModal && <Logout closeHandler={closeModal}/>}

            <h1>Tiny Trello (Главная страница)</h1>
            {loggedUser ?
                <>
                    <h3>Добро пожалость на Tiny Trello, {loggedUser.firstName} {loggedUser.lastName}!</h3>
                    <button onClick={showLogout}>Выход</button>
                    <Link to="board_list">Мои рабочие пространства (доски)</Link>
                </>
                :
                <>
                    <button onClick={showRegister}>Регистрация</button>
                    <button onClick={showLogin}>Вход</button>
                </>
            }
        </div>
    );
}

export default Main;