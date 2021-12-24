import React from 'react';
import {useParams} from 'react-router-dom';
import './Board.scss';

const Board: React.FC = () => {
    const {boardId} = useParams();

    return (
        <div>
            Здесь будет страница с содержимым доски с идентификатором {boardId}
        </div>
    );
}

export default Board;