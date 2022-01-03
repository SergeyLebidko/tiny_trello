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
        <div className="logout">
            <div className="logout__content">
                <h1 className="logout__service_title">Tiny Trello</h1>
                <h1 className="logout__modal_title">{text}</h1>
                <div className="logout__control_block">
                    <button className="button" onClick={cancelHandler}>Отмена</button>
                    <button className="button" onClick={acceptHandler}>{buttonLabel}</button>
                </div>
            </div>
        </div>
    );
};

export default Confirm;