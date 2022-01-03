import React, {FC} from 'react';

const Confirm: FC = () => {

    return (
        <div className="logout">
            <div className="logout__content">
                <h1 className="logout__service_title">Tiny Trello</h1>
                <h1 className="logout__modal_title">Вы действительно хотите выйти?</h1>
                <div className="logout__control_block">
                    {/*<button className="button" onClick={closeHandler}>Отмена</button>*/}
                    {/*<button className="button" onClick={exitHandler}>Выйти</button>*/}
                </div>
            </div>
        </div>
    );
};

export default Confirm;