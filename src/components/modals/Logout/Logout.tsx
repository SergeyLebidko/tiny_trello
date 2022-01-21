import React from 'react';
import {useDispatch} from 'react-redux';
import {logoutUserAction} from '../../../store/user/actions';
import './Logout.scss';

//images
import iconReturn from '../../../content/icons/return.svg';
import modalHeaderLogo from '../../../content/images/modals/modal-header-logo.png';
import modalFooterLogo from '../../../content/images/modals/modal-footer-logo.png';
import modalFooterLeft from '../../../content/images/modals/modal-footer-left.png';
import modalFooterRight from '../../../content/images/modals/modal-footer-right.png';
import userLogo from '../../../content/images/modals/user-logo.png';

type LogoutProps = {
    closeHandler: () => void
    removeOverflowHidden: () => void
    firstName: string
    lastName: string
}

const Logout: React.FC<LogoutProps> = ({closeHandler, removeOverflowHidden, firstName, lastName}) => {
    const dispatch = useDispatch();

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
                <img src={iconReturn} alt="back"/>
            </button>
            <img className="logout__logo" src={modalHeaderLogo} alt="logo" />

            <div className="logout__content">
                <p className="logout__content_logo">Выйти из аккаунта Atlassian</p>
                <div className="logout__user_block">
                    <img className="logout__user_img" src={userLogo} alt="ac-logo" />
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
                <img className="logout__footer_img" src={modalFooterLogo} alt="Atlassian" />
                <span className="logout__footer_text">Один аккаунт для Trello, Jira, Confluence и <a className="logout__link" href="#">не только</a></span>
            </div>
            <img className="logout__footer_img_left" src={modalFooterLeft} alt="bg-l" />
            <img className="logout__footer_img_right" src={modalFooterRight} alt="bg-r" />
        </div>
    );
}

export default Logout;