import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import Register from '../../modals/Register/Register';
import Login from '../../modals/Login/Login';
import Logout from '../../modals/Logout/Logout';
import {MAIN_LINKS} from '../../../constants/settings';
import {getLoggedUser, useTypedSelector} from '../../../store/selectors';
import './Main.scss';

// images
import mainHeaderLogo from '../../../content/images/main/main-header-logo.png';
import heroLogo from '../../../content/images/main/main-hero-logo.png';
import productLogo from '../../../content/images/main/main-product-logo.png';
import mainFooterLogo from '../../../content/images/main/main-footer-logo.png';

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
            window.pageYOffset >= 60 ? header?.classList.add('scroll') : header?.classList.remove('scroll');
        })
    }, [])

    return (
        <div className="main">
            
            {/*----- header start -----*/}
            <header className="main__header">
                    <img className="main__header__logo" src={mainHeaderLogo} alt="logo"/>

                    {modalMode === ModalMode.RegisterModal &&
                    <Register closeHandler={closeModal} removeOverflowHidden={removeOverflowHidden}/>}
                    {modalMode === ModalMode.LoginModal &&
                    <Login closeHandler={closeModal} removeOverflowHidden={removeOverflowHidden}/>}
                    {modalMode === ModalMode.LogoutModal &&
                    <Logout closeHandler={closeModal} removeOverflowHidden={removeOverflowHidden}
                            firstName={loggedUser!.firstName} lastName={loggedUser!.lastName}/>}

                    {/*Проверка на залогиненного пользователя*/}
                    {loggedUser ?
                        <div className="main__header__block">
                            <h3 className="main__header__user_names">
                                {loggedUser.firstName} {loggedUser.lastName}
                            </h3>

                            <button className="main__header__btn_logout" onClick={() => {
                                showLogout();
                                setOverflowHidden()
                            }}>Выход
                            </button>
                            {/*Может тут ссылка сначала на страницу пользователя, а потом отдельная ссылка на список бордов?*/}
                            <Link className="main__header__link_board" to="board_list">Мои пространства</Link>
                        </div>
                        :
                        <>
                            <div className="main__header__btn_block">
                                <button className="main__header__btn_login" onClick={() => {
                                    showLogin();
                                    setOverflowHidden()
                                }}>Войти
                                </button>
                                <button className="main__header__btn_register" onClick={() => {
                                    showRegister();
                                    setOverflowHidden()
                                }}>Регистрация
                                </button>
                            </div>

                        </>
                    }
            </header>
            {/*----- header end -----*/}


            <main className="main__container">
                {/*----- hero start -----*/}
                <section className="main__hero">
                    <div className="main__hero__block_left">
                        <h1 className="main__hero_headline"><span>Trello</span> помогает командам эффективно решать рабочие задачи.</h1>
                        <p className="main__hero_text">Работайте в команде, управляйте проектами и выводите
                            продуктивность на новый уровень собственным уникальным способом вместе с <span>Trello</span>.
                        </p>
                        <form className="main__hero__form">
                            <input className="main__hero_inp" type="email" placeholder="Электронная почта"/>
                            <button className="main__hero_btn" type="submit">Зарегистрируйтесь — это бесплатно!</button>
                        </form>
                    </div>
                    <div className="main__hero__block_right">
                        <img className="main__hero_img" src={heroLogo} alt="hero-logo"/>
                    </div>
                </section>
                {/*----- hero end -----*/}

                {/*----- product start -----*/}
                <section className="main__product">
                    <h2 className="main__product_headline">Это не просто работа. Это координация действий в команде.</h2>
                    <p className="main__product_text">Начните с досок, колонок и карточек, а затем переходите к более
                        сложным функциям. Управляйте проектами, упорядочивайте задачи и поддерживайте командный дух&nbsp;—
                        все это в Trello.</p>
                    <button className="main__product_btn">Начать работу →</button>
                    <img className="main__product_img" src={productLogo} alt=""/>
                </section>
                {/*----- product end -----*/}
            </main>

            {/*----- footer start -----*/}
            <footer className="main__footer">
                    <ul className="main__footer__list">
                        {MAIN_LINKS.map(link => <li key={link}><a href="#">{link}</a></li>)}
                    </ul>
                    <img className="main__footer_img" src={mainFooterLogo} alt="Atlassian"/>
                    <p className="main__footer_text">© 2021. Все права защищены.</p>
            </footer>
            {/*-----footer end -----*/}
        </div>
    );
}

export default Main;