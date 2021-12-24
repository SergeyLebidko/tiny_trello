import React, {FC} from 'react';

const Menu: FC = () => {
    return (
        <div style={{width: 200, fontSize: 30, backgroundColor: "lightblue"}}>
            <h2>Меню</h2>
            <ul>
                <li>Доски</li>
                <li>Настройки</li>
                <li>Выйти</li>
            </ul>
        </div>
    );
};

export default Menu;