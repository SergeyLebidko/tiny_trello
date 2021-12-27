import React from 'react';
import {Card} from '../../store/card/types';
import {getTasks, useTypedSelector} from '../../store/selectors';
import TaskPanel from '../TaskPanel/TaskPanel';
import './CardPanel.scss';

const CardPanel: React.FC<Card> = ({id, title}) => {
    const tasks = useTypedSelector(getTasks);

    return (
        <div className="card_panel">
            <h1>{title}</h1>
            <ul>
                {tasks
                    .filter(task => task.cardId === id)
                    .sort((a, b) => a.order - b.order)
                    .map(task => <TaskPanel key={task.id} {...task}/>)
                }
            </ul>
        </div>
    );
};

export default CardPanel;