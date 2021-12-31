import React, {useEffect, useRef, useState} from 'react';
import {Card} from '../../store/card/types';
import {getTasks, useTypedSelector} from '../../store/selectors';
import TaskPanel from '../TaskPanel/TaskPanel';
import {Importance, Task} from '../../store/task/types';
import {useDispatch} from 'react-redux';
import {createTask, patchTask, removeTask} from '../../store/task/actions';
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
    const [edit,setEdit] = useState<boolean>(false)
    const [selected,setSelected] = useState<Importance>(Importance.Low)
    const textRef = useRef<HTMLTextAreaElement>(null)
    const dateRef = useRef<HTMLInputElement>(null)

    const removeTaskHandler = (task: Task): void => {
        dispatch(removeTask(task));
    }

    const addTaskHandler = () : void => {
        if (!textRef.current || !dateRef.current) return;
        dispatch(createTask(
            {
                cardId: card.id as number,
                text: textRef.current.value,
                done: false,
                importance: selected,
                deadline: +new Date(dateRef.current.value),
                order: tasks.filter(task => task.cardId === card.id).length,
            }
        ))
        setEdit(!edit)
    }

    const {id, title} = card;

    function dragOverHandler(e: React.DragEvent<HTMLLIElement>) {
        e.preventDefault();
        if (e.currentTarget.className === "task_panel") {
            e.currentTarget.className = "task_panel shadowed"
        }
        e.stopPropagation()
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
            order: task.order + 0.1,
        }))
        e.stopPropagation()

    }

    const dropTaskHandler = (e: React.DragEvent<HTMLDivElement>, card: Card) : void => {
        e.preventDefault();
        e.currentTarget.className = "card_panel"
        if (!currentTask) return;
        dispatch(patchTask({
            ...currentTask,
            cardId: card.id as number,
            order: tasks.filter(task => task.cardId === card.id).length + 0.1,
        }))
    }

    function dropTaskOverHandler(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();
        if (e.currentTarget.className === "card_panel") {
            e.currentTarget.className = "card_panel shadowed"
        }
    }

    function dropTaskLeaveHandler(e: React.DragEvent<HTMLDivElement>) {
        e.currentTarget.className = "card_panel"
    }

    function dropTaskEndHandler(e: React.DragEvent<HTMLDivElement>) {
        e.currentTarget.className = "card_panel"
    }

    useEffect(() => {
        tasks.filter(task => task.cardId === card.id).sort((a, b) => a.order - b.order).map((task,i) => {
            return  dispatch(patchTask({
                ...task,
                order: i,
            }))
        })
    },[tasks.filter(task => task.cardId === card.id).length])


    return (
        <div
            className="card_panel"
            onDrop={(e: React.DragEvent<HTMLDivElement>) => dropTaskHandler(e,card)}
            onDragOver={(e: React.DragEvent<HTMLDivElement>) => dropTaskOverHandler(e)}
            onDragLeave={(e: React.DragEvent<HTMLDivElement>) => dropTaskLeaveHandler(e)}
            onDragEnd={(e: React.DragEvent<HTMLDivElement>) => dropTaskEndHandler(e)}
        >
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
                {/*Переключатель режима создания таски*/}
                { edit?
                    <li style={{width: 200, height: 150, border: '1px solid black'}}>
                        <p>Введите текст задачи</p>
                        <textarea ref={textRef} autoFocus></textarea>
                        <select value={selected} onChange={(e:React.ChangeEvent<HTMLSelectElement>) => setSelected(e.currentTarget.value as Importance)}>
                            <option value={Importance.Low}>Низкая</option>
                            <option value={Importance.Medium}>Средняя</option>
                            <option value={Importance.High}>Высокая</option>
                        </select>
                        <input type="date" ref={dateRef}/>
                        <button onClick={addTaskHandler}>
                            Создать задачу
                        </button>
                    </li>
                    :
                    <li>
                        <button
                            style={{width: 200, border: '1px solid black'}}
                            onClick={() => setEdit(!edit)}
                        >
                            Создать задачу
                        </button>
                    </li>
                }
            </ul>
        </div>
    );
}

export default CardPanel;