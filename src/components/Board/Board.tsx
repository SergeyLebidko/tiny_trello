import React, {FC} from 'react';
import Menu from "../Menu/Menu";
import Workplace from "../Workplace/Workplace";

const Board: FC = () => {
    return (
        <div style={{display:'flex'}}>
            <Menu/>
            <Workplace/>
        </div>
    );
};

export default Board;