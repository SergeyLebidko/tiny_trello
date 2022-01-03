import React, {FC} from 'react';
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
            <div className="confirm__content">
                <h1 className="confirm__title">Tiny Trello</h1>
                <p className="confirm__modal_title">{text}</p>
                <div className="confirm__control_block">
                    <button className="confirm__button" onClick={cancelHandler}>Отмена</button>
                    <button className="confirm__button" onClick={acceptHandler}>{buttonLabel}</button>
                </div>
            </div>
        </div>
    );
};

export default Confirm;