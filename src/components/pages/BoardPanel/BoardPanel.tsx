import React, {useRef, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import {Board} from '../../../store/board/types';
import CardPanel from '../../CardPanel/CardPanel';
import NoMatch from '../NoMatch/NoMatch';
import {getBoards, getCards, useTypedSelector} from '../../../store/selectors';
import {Card} from '../../../store/card/types';
import {useDispatch} from 'react-redux';
import {createCard, removeCard} from '../../../store/card/actions';
import {Importance, Task} from "../../../store/task/types";
import {createTask} from "../../../store/task/actions";
import { useImage } from '../../../utils/hooks';
import './BoardPanel.scss';

const BoardPanel: React.FC = () => {
    const dispatch = useDispatch();
    const { icons } = useImage();

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
    // В зависимости от длины массива карт получаем новую позицию
    function getNewOrder() {
        if (!board) return;
        return cards.filter(card => card.boardId === board.id).length
    }

    return (
        <div className="boardPanel">
            <div className="boardPanel__back">
                    <Link to="/board_list">
                        <img 
                            className="boardPanel__icon_back"
                            src={icons.iconBack} 
                            alt="back" 
                        />
                    </Link>
            </div>
            
            <div className="boardPanel__header">            <div className="boardPanel__header_block">
                    <div className="boardPanel__header_left">
                        <div className="boardPanel__header_left_item"></div>
                    </div>
                    <div className="boardPanel__header_middle">
                        <div className="boardPanel__header__triangle_left"></div>
                        <div className="boardPanel__header__triangle_right"></div>
                        <Link className="boardPanel__logo" to="/">Tiny-trello</Link>
                        <div className="boardPanel__title">                                                   
                            {board.title}
                        </div>
                    </div>
                    <div className="boardPanel__header_right">
                        <div className="boardPanel__header_right_item"></div>
                    </div>                       
                </div>
            </div>

                

            <ul className="boardPanel__content">
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
                {/*когда мы создаем новый список, появляется форма*/}
                {edit ?
                    <li className="cardPanel">
                        <p className="cardPanel__name">Введите название списка</p>
                        <input 
                            className="cardPanel__inp_name"
                            ref={inputRef} 
                            autoFocus
                        />                                
                        <button
                            className="cardPanel__btn_confirm"
                            onClick={addCardHandler}
                        >
                            <img 
                                className="cardPanel__icon_confirm"
                                src={icons.iconConfirm} 
                                alt="confirm" 
                            />
                        </button>
                        <button
                            className="cardPanel__btn_cancel"
                            onClick={() => setEdit(!edit)}
                        >
                            <img 
                                className="cardPanel__icon_cancel"
                                src={icons.iconRemove} 
                                alt="cancel" 
                            />
                        </button>
                    </li>
                    :                    
                    <button
                        className="boardPanel__btn_addCard"
                        onClick={() => setEdit(!edit)}
                    >
                        <img 
                            className="boardPanel__icon_addCard"
                            src={icons.iconAddCard} 
                            alt="addCard" 
                        />
                    </button>                  
                }
            </ul>

            <footer className="boardList__footer">Свои предложения по развитию сайта и переводу присылайте на почту kk309@mail.ru</footer>
        </div>
    );
}

export default BoardPanel;