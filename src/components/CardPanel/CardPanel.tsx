import React from 'react';
import {Card} from '../../store/card/types';
import {getTasks, useTypedSelector} from '../../store/selectors';
import TaskPanel from '../TaskPanel/TaskPanel';
import {Task} from '../../store/task/types';
import {useDispatch} from 'react-redux';
import {removeTask} from '../../store/task/actions';
import './CardPanel.scss';

type CardPaneProps = {
    card: Card,
    removeCardHandler: (card: Card) => void
}

const CardPanel: React.FC<CardPaneProps> = ({card, removeCardHandler}) => {
    const dispatch = useDispatch();

    const tasks = useTypedSelector(getTasks);

    const removeTaskHandler = (task: Task): void => {
        dispatch(removeTask(task));
    }



    const {id, title} = card;


    return (
        <div className="card_panel">
            <h1>{title}</h1>
            <button onClick={() => removeCardHandler(card)}>Удалить карточку</button>
            <ul>
                {tasks
                    .filter(task => task.cardId === id)
                    .sort((a, b) => a.order - b.order)
                    .map(task =>
                        <TaskPanel
                            key={task.id}
                            task={task}
                            card={card}
                            removeTaskHandler={removeTaskHandler}
                        />
                    )
                }
            </ul>
        </div>
    );
};

export default CardPanel;