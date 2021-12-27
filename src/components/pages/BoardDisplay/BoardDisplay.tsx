import React from 'react';
import {useParams} from 'react-router-dom';
import {Board} from '../../../store/board/types';
import NoMatch from '../NoMatch/NoMatch';
import {getBoards, useTypedSelector} from '../../../store/selectors';
import './BoardDisplay.scss';

const BoardDisplay: React.FC = () => {
    const boards: Array<Board> = useTypedSelector(getBoards);
    const {boardId} = useParams();

    const board = boards.find(board => board.id === Number(boardId));

    // Если в url передан некорректный идентификатор доски - выводим страницу 404
    if (!board) return <NoMatch/>;
    
    return (
        <div>
            Здесь будет страница с содержимым доски с идентификатором {board.title}
        </div>
    );
}

export default BoardDisplay;