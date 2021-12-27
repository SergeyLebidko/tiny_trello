import React, {FC, useState} from 'react';
import {Board} from "../../store/board/types";

interface IMenuProps {
    remove: () => void
    rename: () => void
}

const Menu: FC<IMenuProps> = ({remove,rename}) => {

    const [active,setActive] = useState<boolean>(false)

    return (
        <div>
            <div onClick={() => setActive(!active)}>
                Меню
            </div>
            {active ?
                <div>
                    <button onClick={() => remove()}>Удалить доску</button>
                    <button onClick={() => rename()}>Переименовать доску</button>
                </div>
                : null
            }
        </div>
    );
};

export default Menu;