import React from 'react';
import {useDispatch} from 'react-redux';
import {logoutUserAction} from '../../../store/user/actions';
import { useImage } from '../../../utils/hooks';
import './Logout.scss';

type LogoutProps = {
    closeHandler: () => void
    removeOverflowHidden: () => void
    firstName: string
    lastName: string
}

const Logout: React.FC<LogoutProps> = ({closeHandler, removeOverflowHidden, firstName, lastName}) => {
    const dispatch = useDispatch();
    const { modalImg, icons } = useImage();

    const exitHandler = (): void => {
        dispatch(logoutUserAction());

        // После выполнения выхода - закрываем модалку
        closeHandler();
    };

    return (
        <div className="logout">
            <button 
                className="logout__btn_return" 
                onClick={ () => {closeHandler(); removeOverflowHidden()} }
            >
                <img src={icons.iconReturn} alt="back"/>
            </button>
            <img className="logout__logo" src={modalImg.modalHeaderLogo} alt="logo" />

            <div className="logout__content">
                <p className="logout__content_logo">Выйти из аккаунта Atlassian</p>
                <div className="logout__user_block">
                    <img className="logout__user_img" src={modalImg.userLogo} alt="ac-logo" />
                    <div className="logout__user_names">
                        <p>{firstName}</p>
                        <p>{lastName}</p>                        
                    </div>
                </div>

                <button className="logout__btn_submit" onClick={exitHandler}>Выйти</button>
                <div className="logout__another">
                    <a className="logout__link" href="#">Войти в другой аккаунт</a>
                </div>
            </div>

            <div className="logout__policy">
                <a className="logout__link" href="#">Политика конфиденциальности</a> 
                <span className="logout__point">·</span> 
                <a className="logout__link" href="#">Условия использования</a>
            </div>

            <div className="logout__footer">
                <img className="logout__footer_img" src={modalImg.modalFooterLogo} alt="Atlassian" />
                <span className="logout__footer_text">Один аккаунт для Trello, Jira, Confluence и <a className="logout__link" href="#">не только</a></span>
            </div>
            <img className="logout__footer_img_left" src={modalImg.modalFooterLeft} alt="bg-l" />
            <img className="logout__footer_img_right" src={modalImg.modalFooterRight} alt="bg-r" />
        </div>
    );
}

export default Logout;