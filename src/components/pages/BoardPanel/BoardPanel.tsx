import React from 'react';
import {Link, useParams} from 'react-router-dom';
import {Board} from '../../../store/board/types';
import CardPanel from '../../CardPanel/CardPanel';
import NoMatch from '../NoMatch/NoMatch';
import {getBoards, getCards, useTypedSelector} from '../../../store/selectors';
import {Card} from '../../../store/card/types';
import {ROUTE_PREFIX} from '../../../constants/settings';
import './BoardPanel.scss';

const BoardPanel: React.FC = () => {
    const boards: Array<Board> = useTypedSelector(getBoards);
    const cards: Array<Card> = useTypedSelector(getCards);

    const {boardId} = useParams();

    // Ищем доску, соответствующую переданному id. Если доски с таким идентификатором не нашлось - выводим страницу NoMatch
    const board = boards.find(board => board.id === Number(boardId));
    if (!board) return <NoMatch/>;

    return (
        <div>
            <h1>Доска: {board.title}</h1>
            <ul>
                <li><Link to={`/${ROUTE_PREFIX}`}>На главную страницу</Link></li>
                <li><Link to={`/${ROUTE_PREFIX}/board_list`}>К списку досок</Link></li>
            </ul>
            <ul className="board_panel__card_list">
                {cards
                    .filter(card => card.boardId === board.id)
                    .sort((a, b) => a.order - b.order)
                    .map(card => <CardPanel key={card.id} {...card}/>)
                }
            </ul>
        </div>
    );
}

export default BoardPanel;