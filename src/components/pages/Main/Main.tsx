import React, {useEffect, useState} from 'react';
import Register from '../../modals/Register/Register';
import Login from '../../modals/Login/Login';
import Logout from '../../modals/Logout/Logout';
import {Link} from "react-router-dom";
import {getUserIndex, useTypedSelector} from "../../../store/selectors";

enum ModalMode {
    NoModal,
    RegisterModal,
    LoginModal,
    LogoutModal
}

const Main: React.FC = () => {
    const {users, loggedUser} = useTypedSelector(state => state.user)

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
            pageYOffset >= 100 ? header?.classList.add('scroll') : header?.classList.remove('scroll');
        })
    }, [])

    return (
        <div className="main">
            <header>
                <img className="header-logo" src="img/header-logo.png" alt="logo" />

                {modalMode === ModalMode.RegisterModal && <Register closeHandler={closeModal} removeOverflowHidden={removeOverflowHidden}/>}
                {modalMode === ModalMode.LoginModal && <Login closeHandler={closeModal} removeOverflowHidden={removeOverflowHidden}/>}
                {modalMode === ModalMode.LogoutModal && <Logout closeHandler={closeModal}/>}

                {/* <h1>Tiny Trello (Главная страница)</h1> */}
                {/*Проверка на залогиненного пользователя*/}
                {loggedUser ?
                    <>
                        

                        
                        <h3>Добро пожалость на Tiny Trello,
                            {users[getUserIndex(users,loggedUser)].firstName}
                            {users[getUserIndex(users,loggedUser)].lastName}!
                        </h3>

                        <button onClick={showLogout}>Выход</button>
                        {/*Может тут ссылка сначала на страницу пользователя, а потом отдельная ссылка на список бордов?*/}
                        <Link to="board_list">Мои рабочие пространства (доски)</Link>
                    </>
                    :
                    <>  <div className="btn-wrap">
                            <button className="btn-login" onClick={() => {showLogin(); setOverflowHidden()}}>Войти</button>
                            <button className="btn-register" onClick={() => {showRegister(); setOverflowHidden()}}>Регистрация</button>
                        </div>
                        
                    </>
                }
            </header>

            <section id="hero">
                <div className="container-hero">
                    <div className="left-hero">
                        <h1><span>Trello</span> помогает командам эффективно решать рабочие задачи.</h1>
                        <p>Работайте в команде, управляйте проектами и выводите продуктивность на новый уровень собственным уникальным способом вместе с <span>Trello</span>.</p>
                        <form className="form-hero">  
                            <input className="inp-hero" type="email" placeholder="Электронная почта"></input>
                            <button type="submit" className="btn-hero">Зарегистрируйтесь — это бесплатно!</button>
                        </form>
                    </div>
                    <div className="right-hero">
                        <img src="img/hero-img.png" alt="E-mail" />
                    </div>
                </div>
            </section>

            <section id="product">
                <h2>Это не просто работа. Это координация действий в команде.</h2>
                <p>Начните с досок, колонок и карточек, а затем переходите к более сложным функциям. Управляйте проектами, упорядочивайте задачи и поддерживайте командный дух&nbsp;— все это в Trello.</p>
                <button className="btn-product">Начать работу →</button>
                <img src="img/product-img.png" alt="" />
            </section>

            <footer>
                <ul className="footer-links"> 
                    <li><a href="#">Шаблоны</a></li>
                    <li><a href="#">Цены</a></li>
                    <li><a href="#">Приложения</a></li>
                    <li><a href="#">Вакансии</a></li>
                    <li><a href="#">Блог</a></li>
                    <li><a href="#">Разработчики</a></li>
                    <li><a href="#">О нас</a></li>
                    <li><a href="#">Помощь</a></li>
                    <li><a href="#">Юридическая информация</a></li>
                    <li><a href="#">Настройки файлов cookie</a></li>
                    <li><a href="#">Конфиденциальность</a></li>
                </ul>
                <img src="img/footer-img.png" alt="Atlassian" />
                <p>© 2021. Все права защищены.</p>
            </footer>

        </div>
    );
}

export default Main;