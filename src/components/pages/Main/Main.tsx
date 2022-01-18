import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import Register from '../../modals/Register/Register';
import Login from '../../modals/Login/Login';
import Logout from '../../modals/Logout/Logout';
import {MAIN_LINKS} from '../../../constants/settings';
import {getLoggedUser, useTypedSelector} from '../../../store/selectors';
import {useImage} from '../../../utils/hooks';
import './Main.scss';

enum ModalMode {
    NoModal,
    RegisterModal,
    LoginModal,
    LogoutModal
}

const Main: React.FC = () => {
    const loggedUser = useTypedSelector(getLoggedUser);
    const {mainImg} = useImage();

    const [modalMode, setModalMode] = useState<ModalMode>(ModalMode.NoModal);

    const showRegister = (): void => setModalMode(ModalMode.RegisterModal);
    const showLogin = (): void => setModalMode(ModalMode.LoginModal);
    const showLogout = (): void => setModalMode(ModalMode.LogoutModal);

    const closeModal = (): void => setModalMode(ModalMode.NoModal);

    // прячем скроллбар
    const setOverflowHidden = (): void => {
        document.querySelector('html')?.classList.add('overflow-hidden')
    }

    // показываем скроллбар
    const removeOverflowHidden = (): void => {
        document.querySelector('html')?.classList.remove('overflow-hidden')
    }

    // анимация header при прокрутке страницы
    useEffect(() => {
        const header = document.querySelector('header');
        window.addEventListener('scroll', () => {
            pageYOffset >= 60 ? header?.classList.add('scroll') : header?.classList.remove('scroll');
        })
    }, [])

    return (
        <main className="main">
            <header className="main__header">
                <img className="main__logo" src={mainImg.mainHeaderLogo} alt="logo"/>

                {modalMode === ModalMode.RegisterModal &&
                <Register closeHandler={closeModal} removeOverflowHidden={removeOverflowHidden}/>}
                {modalMode === ModalMode.LoginModal &&
                <Login closeHandler={closeModal} removeOverflowHidden={removeOverflowHidden}/>}
                {modalMode === ModalMode.LogoutModal &&
                <Logout closeHandler={closeModal} removeOverflowHidden={removeOverflowHidden}
                        firstName={loggedUser!.firstName} lastName={loggedUser!.lastName}/>}

                {/*Проверка на залогиненного пользователя*/}
                {loggedUser ?
                    <div className="main__stuck">
                        <h3 className="main__user_names">
                            {loggedUser.firstName} {loggedUser.lastName}
                        </h3>

                        <button className="main__btn_logout" onClick={() => {
                            showLogout();
                            setOverflowHidden()
                        }}>Выход
                        </button>
                        {/*Может тут ссылка сначала на страницу пользователя, а потом отдельная ссылка на список бордов?*/}
                        <Link className="main__link_board" to="board_list">Мои пространства</Link>
                    </div>
                    :
                    <>
                        <div className="main__btn_block">
                            <button className="main__btn_login" onClick={() => {
                                showLogin();
                                setOverflowHidden()
                            }}>Войти
                            </button>
                            <button className="main__btn_register" onClick={() => {
                                showRegister();
                                setOverflowHidden()
                            }}>Регистрация
                            </button>
                        </div>

                    </>
                }
            </header>

            <section className="main__hero">
                <div className="main__hero_container">
                    <div className="main__hero_left">
                        <h1><span>Trello</span> помогает командам эффективно решать рабочие задачи.</h1>
                        <p className="main__hero_text">Работайте в команде, управляйте проектами и выводите
                            продуктивность на новый уровень собственным уникальным способом вместе с <span>Trello</span>.
                        </p>
                        <form className="main__hero_form">
                            <input className="main__hero_inp" type="email" placeholder="Электронная почта"/>
                            <button type="submit" className="main__hero_btn">Зарегистрируйтесь — это бесплатно!</button>
                        </form>
                    </div>
                    <div className="main__hero_right">
                        <img className="main__hero_img" src={mainImg.heroLogo} alt="hero-logo"/>
                    </div>
                </div>
            </section>

            <section className="main__product">
                <h2>Это не просто работа. Это координация действий в команде.</h2>
                <p className="main__product_text">Начните с досок, колонок и карточек, а затем переходите к более
                    сложным функциям. Управляйте проектами, упорядочивайте задачи и поддерживайте командный дух&nbsp;—
                    все это в Trello.</p>
                <button className="main__product_btn">Начать работу →</button>
                <img className="main__product_img" src={mainImg.productLogo} alt=""/>
            </section>

            <footer className="main__footer">
                <ul className="main__footer_list">
                    {MAIN_LINKS.map(link => <li key={link}><a href="#">{link}</a></li>)}
                </ul>
                <img className="main__footer_img" src={mainImg.mainFooterLogo} alt="Atlassian"/>
                <p>© 2021. Все права защищены.</p>
            </footer>

        </main>
    );
}

export default Main;