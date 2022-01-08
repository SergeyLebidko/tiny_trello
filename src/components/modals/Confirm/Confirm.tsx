import React, {FC} from 'react';
import { useImage } from '../../../utils/hooks';
import './Confirm.scss';

interface IConfirm {
    text: string;
    buttonLabel: string;
    cancelHandler: () => void;
    acceptHandler: () => void;
}

const Confirm: FC<IConfirm> = ({text, buttonLabel, cancelHandler, acceptHandler}) => {
    const { icons } = useImage();

    return (
        <div className="confirm">
            <p className="confirm__title">Tiny Trello</p>
            <p className="confirm__text">{text}</p>
            <div className="confirm__btn_block">
                {/* В кнопки мы вставляем функции, полученные извне*/}
                <button className="confirm__btn_confirm" onClick={acceptHandler}>
                <img 
                    className="confirm__icon_confirm"
                    src={icons.iconConfirm} 
                    alt="confirm" 
                />
                </button>
                <button className="confirm__btn_cancel" onClick={cancelHandler}>
                <img 
                    className="confirm__icon_cancel"
                    src={icons.iconCancel} 
                    alt="cancel" 
                />
                </button>
            </div>
        </div>
    );
};

export default Confirm;