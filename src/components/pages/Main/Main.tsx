import React, {useEffect, useRef, useState} from 'react';
import {Link} from 'react-router-dom';
import Register from '../../modals/Register/Register';
import Login from '../../modals/Login/Login';
import Logout from '../../modals/Logout/Logout';
import {getLoggedUser, useTypedSelector} from '../../../store/selectors';
import * as logoImage from '../../../content/images/logo.png';
import * as heroImage from '../../../content/images/hero-img.png';
import {ROUTE_PREFIX} from '../../../constants/settings';
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
    const headerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const scrollListener = (): void => {
            if (headerRef.current === null) return;
            if (window.scrollY > 100) {
                headerRef.current.classList.add('main__header_stuck');
            } else {
                headerRef.current.classList.remove('main__header_stuck');
            }
        }

        window.addEventListener('scroll', scrollListener);

        return () => window.removeEventListener('acroll', scrollListener);
    }, []);

    const showRegister = (): void => setModalMode(ModalMode.RegisterModal);
    const showLogin = (): void => setModalMode(ModalMode.LoginModal);
    const showLogout = (): void => setModalMode(ModalMode.LogoutModal);

    const closeModal = (): void => setModalMode(ModalMode.NoModal);

    return (
        <main className="main">
            {modalMode === ModalMode.RegisterModal && <Register closeHandler={closeModal}/>}
            {modalMode === ModalMode.LoginModal && <Login closeHandler={closeModal}/>}
            {modalMode === ModalMode.LogoutModal && <Logout closeHandler={closeModal}/>}

            <header className="main__header main__header_transparent" ref={headerRef}>
                <span className="main__logo"><img src={logoImage.default}/>Tiny Trello</span>
                {loggedUser ?
                    <>
                        <span className="main__user_title">
                            {loggedUser.firstName} {loggedUser.lastName}
                        </span>
                        <div className="main__user_control">
                            <Link className="linked_button" to={`/${ROUTE_PREFIX}/board_list`}>
                                Перейти к доскам
                            </Link>
                            <button className="button" onClick={showLogout}>
                                Выход
                            </button>
                        </div>
                    </>
                    :
                    <div className="main__user_control">
                        <button className="button" onClick={showRegister}>
                            Регистрация
                        </button>
                        <button className="button" onClick={showLogin}>
                            Вход
                        </button>
                    </div>
                }
            </header>

            <section className="main__content">
                <div className="main__text_block">
                    <h1>
                        Tiny Trello
                    </h1>
                    <h3>
                        Помогает командам эффективно решать рабочие задачи.
                    </h3>
                    <p>
                        Работайте в команде, управляйте проектами и выводите продуктивность на новый уровень собственным
                        уникальным способом используя наш сервис.
                    </p>
                </div>
                <img className="main__hero_image" src={heroImage.default}/>
            </section>

            <footer>
                2021. SDN. Все права защищены
            </footer>

        </main>
    );
}

export default Main;