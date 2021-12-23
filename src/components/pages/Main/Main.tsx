import React, {useState} from 'react';
import Register from '../../modals/Register/Register';
import Login from '../../modals/Login/Login';
import Logout from '../../modals/Logout/Logout';
import './Main.scss';

enum ModalMode {
    NoModal,
    RegisterModal,
    LoginModal,
    LogoutModal
}

const Main: React.FC = () => {
    const [modalMode, setModalMode] = useState<ModalMode>(ModalMode.NoModal);

    const showRegister = (): void => setModalMode(ModalMode.RegisterModal);
    const showLogin = (): void => setModalMode(ModalMode.LoginModal);
    const showLogout = (): void => setModalMode(ModalMode.LogoutModal);

    return (
        <div className="main">
            {modalMode === ModalMode.RegisterModal && <Register/>}
            {modalMode === ModalMode.LoginModal && <Login/>}
            {modalMode === ModalMode.LogoutModal && <Logout/>}
            <h1>Tiny Trello (Главная страница)</h1>
            <button onClick={showRegister}>Регистрация</button>
            <button onClick={showLogin}>Вход</button>
            <button onClick={showLogout}>Выход</button>
        </div>
    );
}

export default Main;