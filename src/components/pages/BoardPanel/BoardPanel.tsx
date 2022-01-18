import React, {useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import {Board} from '../../../store/board/types';
import CardPanel from '../../entities/CardPanel/CardPanel';
import CardCreateForm from '../../forms/CardCreateForm/CardCreateForm';
import NoMatch from '../../errors/NoMatch/NoMatch';
import {getBoards, getCards, useTypedSelector} from '../../../store/selectors';
import {Card} from '../../../store/card/types';
import {useDispatch} from 'react-redux';
import {removeCard} from '../../../store/card/actions';
import {Task} from '../../../store/task/types';
import {useImage} from '../../../utils/hooks';
import './BoardPanel.scss';
import {setDNDCard, setDNDTask} from "../../../store/dnd/actions";

const BoardPanel: React.FC = () => {
    const dispatch = useDispatch();
    const boards: Array<Board> = useTypedSelector(getBoards);
    const cards: Array<Card> = useTypedSelector(getCards);

    const [hasCreateForm, setHasCreateForm] = useState<boolean>(false);

    const openCreateForm = (): void => setHasCreateForm(true);
    const closeCreateFrom = (): void => setHasCreateForm(false);

    const {icons} = useImage();

    const removeCardHandler = (card: Card): void => {
        dispatch(removeCard(card));
    }

    function dragStartHandler(e: React.DragEvent<HTMLLIElement | HTMLDivElement>, card: Card, task?: Task) {
        dispatch(setDNDCard(card))
        if (task) {
            dispatch(setDNDTask(task))
        }
    }

    // Ищем доску, по id из url. Если доски с таким id не нашлось - будет выведена страница NoMatch
    const {boardId} = useParams();
    const board = boards.find(board => board.id === Number(boardId));
    if (!board) return <NoMatch/>;

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

            <div className="boardPanel__header">
                <div className="boardPanel__header_block">
                    <div className="boardPanel__header_left">
                        <div className="boardPanel__header_left_item"/>
                    </div>
                    <div className="boardPanel__header_middle">
                        <div className="boardPanel__header__triangle_left"/>
                        <div className="boardPanel__header__triangle_right"/>
                        <Link className="boardPanel__logo" to="/">Tiny-trello</Link>
                        <div className="boardPanel__title">
                            {board.title}
                        </div>
                    </div>
                    <div className="boardPanel__header_right">
                        <div className="boardPanel__header_right_item"/>
                    </div>
                </div>
            </div>

            <ul className="boardPanel__content">
                {cards
                    .filter(card => card.boardId === board.id)
                    .sort((a, b) => a.order - b.order)
                    .map(card =>
                        <CardPanel
                            dragStart={dragStartHandler}
                            key={card.id}
                            card={card}
                            board={board}
                            removeCardHandler={removeCardHandler}
                            //Обработчики перетаскивания карты

                        />)
                }
                {hasCreateForm ?
                    <li>
                        <CardCreateForm board={board} closeHandler={closeCreateFrom}/>
                    </li>
                    :
                    <button className="boardPanel__btn_addCard" onClick={openCreateForm}>
                        <img
                            className="boardPanel__icon_addCard"
                            src={icons.iconAddCard}
                            alt="addCard"
                        />
                    </button>
                }
            </ul>

            <footer className="boardList__footer">Свои предложения по развитию сайта и переводу присылайте на почту
                kk309@mail.ru
            </footer>
        </div>
    );
}

export default BoardPanel;