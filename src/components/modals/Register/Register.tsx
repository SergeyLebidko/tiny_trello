import React, {useRef, useState} from 'react';
import {createRandomString} from '../../../utils/common';
import {ALL_LETTERS, DIGITS, PASSWORD_MIN_LEN} from '../../../constants/settings';
import {useError} from '../../../utils/hooks';
import {useDispatch} from 'react-redux';
import {registerUserAction} from '../../../store/user/actions';
import './Register.scss';

//images
import iconReturn from '../../../content/icons/return.svg';
import iconShow from '../../../content/icons/show-pass.png';
import iconHide from '../../../content/icons/hide-pass.png';
import iconGoogle from '../../../content/icons/google-logo.png';
import iconMs from '../../../content/icons/ms-logo.png';
import iconApple from '../../../content/icons/apple-logo.png';
import input from '../../../content/images/modals/input-fake.png';
import modalHeaderLogo from '../../../content/images/modals/modal-header-logo.png';
import modalFooterLogo from '../../../content/images/modals/modal-footer-logo.png';
import modalFooterLeft from '../../../content/images/modals/modal-footer-left.png';
import modalFooterRight from '../../../content/images/modals/modal-footer-right.png';

type RegisterProps = {
    closeHandler: () => void
    removeOverflowHidden: () => void
}

const Register: React.FC<RegisterProps> = ({closeHandler, removeOverflowHidden}) => {
    const dispatch = useDispatch();

    const [showPassword, setShowPassword] = useState<boolean>(false);

    const [error, setErrorText] = useError();

    const loginRef = useRef<HTMLInputElement>(null);
    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);
    const password1Ref = useRef<HTMLInputElement>(null);
    const password2Ref = useRef<HTMLInputElement>(null);

    const loginId = createRandomString();
    const firstNameId = createRandomString();
    const lastNameId = createRandomString();
    const password1Id = createRandomString();
    const password2Id = createRandomString();

    const showPasswordHandler = (): void => setShowPassword(oldValue => !oldValue);

    const createPasswordHandler = (): void => {
        if (!password1Ref.current || !password2Ref.current) return;
        setShowPassword(true);
        const password = createRandomString(PASSWORD_MIN_LEN, false);
        password1Ref.current.value = password;
        password2Ref.current.value = password;
    }

    const registerHandler = (): void => {
        if (!loginRef.current || !firstNameRef.current || !lastNameRef.current || !password1Ref.current || !password2Ref.current) return;

        const login = loginRef.current.value.trim();
        const firstName = firstNameRef.current.value.trim();
        const lastName = lastNameRef.current.value.trim();
        const password1 = password1Ref.current.value;
        const password2 = password2Ref.current.value;

        if (![login, firstName, lastName, password1, password2].every(value => !!value)) {
            setErrorText('?????? ???????? ?????????????????????? ?? ????????????????????');
            return;
        }

        if (DIGITS.includes(login[0])) {
            setErrorText('?????????? ???????????????????? ?? ??????????');
            return;
        }

        if (login.split('').some(letter => !ALL_LETTERS.includes(letter))) {
            setErrorText('?????????? ???????????????? ???????????????????????? ??????????????');
            return;
        }

        if (password1 !== password2) {
            setErrorText('???????????? ?? ?????????????????????????? ???? ??????????????????');
            return;
        }

        if (password1.length < PASSWORD_MIN_LEN) {
            setErrorText(`?????????????? ???????????????? ????????????`);
            return;
        }

        const error = dispatch(registerUserAction({
            login,
            firstName,
            lastName,
            password: password1
        }));
        if (error !== null) {
            setErrorText(String(error));
            return;
        }

        // ???????? ?????? ???????????????????? ?????????????????????? ???? ?????????????????? ???????????? - ?????????????????? ??????????????
        closeHandler();
        removeOverflowHidden();
    }

    return (
        <div className="register">
        <button 
            className="register__btn_return" 
            onClick={() => {closeHandler(); removeOverflowHidden()}}
        >
            <img src={iconReturn} alt="back"/>
        </button>                    
        <img className="register__logo" src={modalHeaderLogo} alt="logo" />

        <div className="register__content">
            {error && <p className="register__danger">{error}</p>}
            <p className="register__content_logo">???????????????????????????????? ??????????????</p>
                <div className="register__form">
                    <input 
                        className="register__inp" 
                        placeholder="?????????????? ??????????" 
                        id={loginId} ref={loginRef}
                    />                    
                    <input 
                        className="register__inp"
                        placeholder="??????" 
                        id={firstNameId} 
                        ref={firstNameRef}
                    />
                    <input 
                        className="register__inp"
                        placeholder="??????????????"
                        id={lastNameId} 
                        ref={lastNameRef}
                    />
                    <button className="register__btn_create_pass" onClick={createPasswordHandler}>?????????????? ????????????</button>
                    <div className="register__password_block">
                        <input className="register__password_inp" 
                            placeholder="?????????????? ????????????" 
                            id={password1Id} 
                            ref={password1Ref} 
                            type={showPassword ? 'text' : 'password'}
                        />
                        <img 
                            className="register__password_look"
                            src={showPassword ? iconShow : iconHide} 
                            alt="show/hide-pass" 
                            onClick={showPasswordHandler}
                        />                            
                    </div>
                    <div className="register__password_block">
                        <input className="register__password_inp" 
                            placeholder="?????????????? ????????????" 
                            id={password2Id} 
                            ref={password2Ref} 
                            type={showPassword ? 'text' : 'password'}
                        />
                        <img 
                            className="register__password_look"
                            src={showPassword ? iconShow : iconHide} 
                            alt="show/hide-pass" 
                            onClick={showPasswordHandler}
                        />                            
                    </div> 
                    <div className="register__conditions">
                        <span>??????????????????????????, ???? ??????????????????????????, ?????? ???????????????????? ????????</span>
                        <span>
                            <a className="register__link" href="">?????????????? ??????????????????????????</a> ??<br/> <a className="register__link" href="">???????????????? ????????????????????????????????????</a>
                        </span>                        
                    </div>                     
                    
                                        
                    <button className="register__btn_submit" onClick={registerHandler}>??????????????????????</button>
                </div>                
                
            <p className="register__or">??????</p>

            <button className="register__btn_out">
                <img className="register__btn_img" src={iconGoogle} alt="google" />
                <span className="register__btn_text">?????????? ?????????? Google</span>
            </button>
            <button className="register__btn_out">
                <img className="register__btn_img" src={iconMs} alt="ms" />
                <span className="register__btn_text">?????????? ?????????? Microsoft</span>
            </button>
            <button className="register__btn_out">
                <img className="register__btn_img" src={iconApple} alt="apple" />
                <span className="register__btn_text">?????????? ?????????? Apple</span>
            </button>            
        </div>

        <div className="register__lang">
            <img src={input} alt="lang" />
        </div>

        <div className="register__footer">
            <img className="register__footer_img" src={modalFooterLogo} alt="Atlassian" />
            <ul className="register__footer_list">
                <li><a href="#">??????????????</a></li>
                <li><a href="#">????????</a></li>
                <li><a href="#">????????????????????</a></li>
                <li><a href="#">????????????????</a></li>
                <li><a href="#">????????</a></li>
                <li><a href="#">????????????????????????</a></li>
                <li><a href="#">?? ??????</a></li>
                <li><a href="#">????????????</a></li>
                <li><a href="#">?????????????????? ???????????? cookie</a></li>
            </ul>
        </div>

        <img className="register__footer_img_left" src={modalFooterLeft} alt="bg-l" />
        <img className="register__footer_img_right" src={modalFooterRight} alt="bg-r" />
        </div>
    );
}

export default Register;