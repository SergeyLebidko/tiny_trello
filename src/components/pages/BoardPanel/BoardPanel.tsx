import React, {useRef, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import {Board} from '../../../store/board/types';
import CardPanel from '../../CardPanel/CardPanel';
import NoMatch from '../NoMatch/NoMatch';
import {getBoards, getCards, useTypedSelector} from '../../../store/selectors';
import {Card} from '../../../store/card/types';
import {useDispatch} from 'react-redux';
import {createCard, removeCard} from '../../../store/card/actions';
import './BoardPanel.scss';
import {Importance, Task} from "../../../store/task/types";
import {createTask} from "../../../store/task/actions";

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
    const [edit, setEdit] = useState<boolean>(false)
    const inputRef = useRef<HTMLInputElement>(null)

    // Ищем доску, соответствующую переданному id. Если доски с таким идентификатором не нашлось - выводим страницу NoMatch
    const board = boards.find(board => board.id === Number(boardId));

    if (!board) return <NoMatch/>;

    function dragStartHandler(e:React.DragEvent<HTMLLIElement>,card: Card, task: Task) {
        setCurrentCard(card)
        setCurrentTask(task)
    }

    const addCardHandler = (): void => {
        if (!inputRef.current) return;
        dispatch(createCard(
            {
                boardId: board.id as number,
                title: inputRef.current.value,
                order: getNewOrder() as number,
            }
        ))
        setEdit(!edit)
    }

    function getNewOrder() {
        if (!board) return;
        return cards.filter(card => card.boardId === board.id).length
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
                {edit ?
                    <li style={{width: 200, height: 150, border: '1px solid black'}}>
                        <p>Введите название списка</p>
                        <input ref={inputRef} autoFocus></input>
                        <button
                            onClick={addCardHandler}
                            style={{width: 200, border: '1px solid black'}}
                        >
                            Создать список
                        </button>
                        <button
                            style={{width: 200, border: '1px solid black'}}
                            onClick={() => setEdit(!edit)}
                        >
                            Отмена
                        </button>
                    </li>
                    :
                    <li>
                        <button
                            style={{width: 200, border: '1px solid black'}}
                            onClick={() => setEdit(!edit)}
                        >
                            Создать список
                        </button>
                    </li>
                }
            </ul>
        </div>
    );
}

export default BoardPanel;