import React, {useState} from 'react';
import Register from '../../modals/Register/Register';
import Login from '../../modals/Login/Login';
import Logout from '../../modals/Logout/Logout';
import {useSelector} from 'react-redux';
import {getUser} from '../../../store/selectors';
import {User} from '../../../store/user/types';
import './Main.scss';
import {RootState} from "../../../store/store";

enum ModalMode {
    NoModal,
    RegisterModal,
    LoginModal,
    LogoutModal
}

const Main: React.FC = () => {
    const user = useSelector<RootState, User | null>(getUser);

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
            {user ?
                <button onClick={showLogout}>Выход</button>
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