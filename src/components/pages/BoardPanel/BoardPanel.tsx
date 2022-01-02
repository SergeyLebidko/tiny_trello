import React, {useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import {Board} from '../../../store/board/types';
import CardPanel from '../../CardPanel/CardPanel';
import NoMatch from '../NoMatch/NoMatch';
import {getBoards, getCards, useTypedSelector} from '../../../store/selectors';
import {Card} from '../../../store/card/types';
import {useDispatch} from 'react-redux';
import {removeCard} from '../../../store/card/actions';
import './BoardPanel.scss';
import {Task} from "../../../store/task/types";

const BoardPanel: React.FC = () => {
    const dispatch = useDispatch();

    const boards: Array<Board> = useTypedSelector(getBoards);
    const cards: Array<Card> = useTypedSelector(getCards);

    const {boardId} = useParams();

    const removeCardHandler = (card: Card): void => {
        dispatch(removeCard(card));
    }

    const [currentCard,setCurrentCard] = useState<Card | null>(null)
    const [currentTask,setCurrentTask] = useState<Task | null>(null)

    // Ищем доску, соответствующую переданному id. Если доски с таким идентификатором не нашлось - выводим страницу NoMatch
    const board = boards.find(board => board.id === Number(boardId));
    if (!board) return <NoMatch/>;

    function dragStartHandler(e:React.DragEvent<HTMLLIElement>,card: Card, task: Task) {

        // Тут должен быть код по настройке непрозрачности элемента, пока заготовки
        // const dragged = e.currentTarget
        // dragged.style.opacity = 'visible'
        // e.dataTransfer.setDragImage( dragged,0, 0);

        setCurrentCard(card)
        setCurrentTask(task)
    }

    return (
        <div>
            <h1>Доска: {board.title}</h1>
            <ul>
                <li><Link to="/">На главную страницу</Link></li>
                <li><Link to="/board_list">К списку досок</Link></li>
            </ul>
            <ul className="board_panel__card_list">
                {cards
                    .filter(card => card.boardId === board.id)
                    .sort((a, b) => a.order - b.order)
                    .map(card =>
                        <CardPanel
                            currentCard={currentCard}
                            currentTask={currentTask}
                            dragStart={dragStartHandler}
                            key={card.id}
                            card={card}
                            removeCardHandler={removeCardHandler}
                        />)
                }
            </ul>
        </div>
    );
}

export default BoardPanel;