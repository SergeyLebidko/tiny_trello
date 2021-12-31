import React from 'react';
import {Card} from '../../store/card/types';
import {getTasks, useTypedSelector} from '../../store/selectors';
import TaskPanel from '../TaskPanel/TaskPanel';
import {Task} from '../../store/task/types';
import {useDispatch} from 'react-redux';
import {patchTask, removeTask} from '../../store/task/actions';
import './CardPanel.scss';

type CardPaneProps = {
    card: Card,
    removeCardHandler: (card: Card) => void,
    dragStart: (card: Card, task: Task) => void,
    currentCard: Card | null,
    currentTask: Task | null,
}

const CardPanel: React.FC<CardPaneProps> = ({card, removeCardHandler, dragStart, currentTask}) => {
    const dispatch = useDispatch();

    const tasks = useTypedSelector(getTasks);

    const removeTaskHandler = (task: Task): void => {
        dispatch(removeTask(task));
    }

    const {id, title} = card;

    function dragOverHandler(e: React.DragEvent<HTMLLIElement>) {
        e.preventDefault();
        if (e.currentTarget.className === "task_panel") {
            e.currentTarget.className = "task_panel shadowed"
        }
    }

    function dragLeaveHandler(e: React.DragEvent<HTMLLIElement>) {
        e.currentTarget.className = "task_panel"
    }

    function dragEndHandler(e: React.DragEvent<HTMLLIElement>) {
        e.currentTarget.className = "task_panel"
    }

    function dropHandler(e: React.DragEvent<HTMLLIElement>, card: Card, task: Task) {
        e.preventDefault();
        e.currentTarget.className = "task_panel"

        if (!currentTask) return;

        dispatch(patchTask({
            ...currentTask,
            cardId: card.id as number,
            order: task.order - 0.01,
        }))

        tasks
            .filter(task => task.cardId === card.id)
            .map((task, index) => {
                    dispatch(patchTask({
                        ...task,
                        order: index,
                    }))
                }
            )
    }

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
                            dragOver={(e: React.DragEvent<HTMLLIElement>) => dragOverHandler(e)}
                            dragLeave={(e: React.DragEvent<HTMLLIElement>) => dragLeaveHandler(e)}
                            dragEnd={(e: React.DragEvent<HTMLLIElement>) => dragEndHandler(e)}
                            dragStart={dragStart}
                            drop={(e: React.DragEvent<HTMLLIElement>) => dropHandler(e, card, task)}
                        />
                    )
                }
            </ul>
        </div>
    );
}

export default CardPanel;