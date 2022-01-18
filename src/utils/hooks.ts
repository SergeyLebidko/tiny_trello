import {useEffect, useRef, useState} from 'react';

export function useModalError(): [string | null, (text: string) => void]{
    const [error, setError] = useState<string | null>(null);
    const errorTimer: { current: NodeJS.Timeout | undefined } = useRef();

    // Предотвращаем возможное изменение состояния компонента по таймеру, после того как компонент размонтирован
    useEffect(() => {
        return () => {
            if (typeof errorTimer.current !== 'undefined') clearTimeout(errorTimer.current);
        }
    }, []);

    const setErrorText = (text: string): void => {
        setError(text);
        errorTimer.current = setTimeout(() => setError(null), 4000);
    }

    return [error, setErrorText];
}

// Hook useImage for styles
//
// main
import heroLogo from '../content/images/main/main-hero-logo.png';
import mainFooterLogo from '../content/images/main/main-footer-logo.png';
import mainHeaderLogo from '../content/images/main/main-header-logo.png';
import productLogo from '../content/images/main/main-product-logo.png';

// madals
import modalHeaderLogo from '../content/images/modals/modal-header-logo.png';
import userLogo from '../content/images/modals/user-logo.png';
import input from '../content/images/modals/input-fake.png';
import modalFooterLogo from '../content/images/modals/modal-footer-logo.png';
import modalFooterLeft from '../content/images/modals/modal-footer-left.png';
import modalFooterRight from '../content/images/modals/modal-footer-right.png';

// icons
import iconAdd from '../content/icons/btn-add.png';
import iconAddTask from '../content/icons/btn-add-task.svg';
import iconAddCard from '../content/icons/btn-add-card.png';
import iconRemove from '../content/icons/btn-remove.svg';
import iconRemoveTask from '../content/icons/btn-remove-task.svg';
import iconConfirm from '../content/icons/btn-confirm.svg';
import iconBack from '../content/icons/btn-back.png';
import iconCancel from '../content/icons/btn-cancel.svg';
import iconSelect from '../content/icons/btn-select.svg';
import iconReturn from '../content/icons/btn-back.svg';
import iconGoogle from '../content/icons/google-logo.png';
import iconHide from '../content/icons/hide-pass.png';
import iconMs from '../content/icons/ms-logo.png';
import iconShow from '../content/icons/show-pass.png';
import iconApple from '../content/icons/apple-logo.png';

type useImage = {
    mainImg: {[key: string]: string},
    modalImg: {[key: string]: string},
    icons: {[key: string]: string}
}

export function useImage(): useImage {
    const mainImg = {
        heroLogo, 
        mainFooterLogo, 
        mainHeaderLogo, 
        productLogo
    };
    const modalImg = {
        modalHeaderLogo, 
        userLogo, 
        input, 
        modalFooterLogo,
        modalFooterLeft, 
        modalFooterRight, 

    };
    const icons = {
        iconAdd,
        iconRemove,
        iconConfirm,
        iconAddTask,
        iconBack,
        iconAddCard,
        iconCancel,
        iconRemoveTask,
        iconReturn,
        iconApple,
        iconGoogle,
        iconHide,
        iconMs,
        iconShow,
        iconSelect

    }

    return {mainImg, modalImg, icons};
}