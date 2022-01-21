import React, {FC} from 'react';

// images
import iconConfirm from '../../../content/icons/btn-confirm.svg';
import iconCancel from '../../../content/icons/btn-cancel.svg';

import './Confirm.scss';

interface IConfirm {
    text: string;
    buttonLabel: string;
    cancelHandler: () => void;
    acceptHandler: () => void;
}

const Confirm: FC<IConfirm> = ({text, buttonLabel, cancelHandler, acceptHandler}) => {

    return (
        <div className="confirm">
            <p className="confirm__title">Tiny Trello</p>
            <p className="confirm__text">{text}</p>
            <div className="confirm__btn_block">
                {/* В кнопки мы вставляем функции, полученные извне*/}
                <button className="confirm__btn_confirm" onClick={acceptHandler}>
                <img 
                    className="confirm__icon_confirm"
                    src={iconConfirm} 
                    alt="confirm" 
                />
                </button>
                <button className="confirm__btn_cancel" onClick={cancelHandler}>
                <img 
                    className="confirm__icon_cancel"
                    src={iconCancel} 
                    alt="cancel" 
                />
                </button>
            </div>
        </div>
    );
};

export default Confirm;