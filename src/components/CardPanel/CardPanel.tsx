import React, {useEffect, useRef, useState} from 'react';
import {Card} from '../../store/card/types';
import {getTasks, useTypedSelector} from '../../store/selectors';
import TaskPanel from '../TaskPanel/TaskPanel';
import {Importance, Task} from '../../store/task/types';
import {useDispatch} from 'react-redux';
import {createTask, patchTask, removeTask} from '../../store/task/actions';
import './CardPanel.scss';
import Confirm from "../modals/Confirm/Confirm";

type CardPaneProps = {
    card: Card,
    removeCardHandler: (card: Card) => void,
    dragStart: (e: React.DragEvent<HTMLLIElement>, card: Card, task: Task) => void,
    currentCard: Card | null,
    currentTask: Task | null,
}

const CardPanel: React.FC<CardPaneProps> = ({card, removeCardHandler, dragStart, currentCard, currentTask}) => {
    const dispatch = useDispatch();

    const tasks = useTypedSelector(getTasks);

    const [edit, setEdit] = useState<boolean>(false)
    const [selected, setSelected] = useState<Importance>(Importance.Low)
    const [newTask, setNewTask] = useState<Task | null>(null)
    const [modalMode, setModalMode] = useState<boolean>(false);

    const textRef = useRef<HTMLTextAreaElement>(null)
    const dateRef = useRef<HTMLInputElement>(null)

    const getToday = (): string => {
        const date = new Date(Date.now());
        const d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        const m = date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
        const y = date.getFullYear();
        return `${y}-${m}-${d}`
    }

    function getNewOrder() {
        return tasks.filter(task => task.cardId === card.id).length
    }

    const addTaskHandler = (): void => {
        if (!textRef.current || !dateRef.current) return;

        dispatch(createTask(
            {
                cardId: card.id as number,
                text: textRef.current.value,
                done: false,
                importance: selected,
                deadline: +new Date(dateRef.current.value),
                order: getNewOrder(),
            }
        ))
        setEdit(!edit)
    }

    function dragOverHandler(e: React.DragEvent<HTMLLIElement>) {
        e.preventDefault();
        e.stopPropagation()
    }

    function dragLeaveHandler(e: React.DragEvent<HTMLLIElement>) {
        e.currentTarget.className = "task_panel"
    }

    function dragEndHandler(e: React.DragEvent<HTMLLIElement>) {
        e.currentTarget.className = "task_panel"
    }

    function dragEnterHandler(e: React.DragEvent<HTMLLIElement>, card: Card, task: Task) {
        e.stopPropagation()
        e.currentTarget.className = "task_panel shadowed"
        if (!currentTask) return;
        // Идет проверка условия, при котором будет определяться как перетасовываются карточки
        if (currentCard === card && task.order > currentTask.order) {
            dispatch(patchTask({
                ...currentTask,
                cardId: card.id as number,
                order: task.order + 0.1,
            }))
        } else {
            dispatch(patchTask({
                ...currentTask,
                cardId: card.id as number,
                order: task.order - 0.1,
            }))
        }
        setNewTask(task)
    }

    function dropHandler(e: React.DragEvent<HTMLLIElement>) {
        e.preventDefault();
        e.currentTarget.className = "task_panel"
    }

    const cardTaskEnterHandler = (e: React.DragEvent<HTMLDivElement>, card: Card): void => {
        e.preventDefault();
        e.currentTarget.className = "card_panel"
        if (!currentTask || !currentCard) return;
        if (currentCard === card) return;
        dispatch(patchTask({
            ...currentTask,
            cardId: card.id as number,
            order: getNewOrder(),
        }))
    }

    function cardTaskOverHandler(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();
        // Добавление эффектов
        if (e.currentTarget.className === "card_panel") {
            e.currentTarget.className = "card_panel shadow"
        }
    }

    function cardTaskLeaveHandler(e: React.DragEvent<HTMLDivElement>) {
        e.currentTarget.className = "card_panel"
    }

    function cardTaskEndHandler(e: React.DragEvent<HTMLDivElement>) {
        e.currentTarget.className = "card_panel"
    }

    function cardDropHandler(e: React.DragEvent<HTMLDivElement>) {
        e.currentTarget.className = "card_panel"
    }

    // Очередь обновляется при каждой новой замененной таске (возможно костьльно, так как не нашел способа избежать ререндера)
    useEffect(() => {
        if (!currentTask) return;
        tasks.filter(task => task.cardId === card.id).sort((a, b) => a.order - b.order).map((task, i) => {
            return dispatch(patchTask({
                ...task,
                order: i,
            }))
        })
    }, [newTask])

    const {id, title} = card;

    return (
        <div
            className="card_panel"
            onDragEnter={(e: React.DragEvent<HTMLDivElement>) => cardTaskEnterHandler(e, card)}
            onDragOver={(e: React.DragEvent<HTMLDivElement>) => cardTaskOverHandler(e)}
            onDragLeave={(e: React.DragEvent<HTMLDivElement>) => cardTaskLeaveHandler(e)}
            onDragEnd={(e: React.DragEvent<HTMLDivElement>) => cardTaskEndHandler(e)}
            onDrop={(e: React.DragEvent<HTMLDivElement>) => cardDropHandler(e)}
        >
            <h1>{title}</h1>
            <button className="card_delete" onClick={() => setModalMode(true)}>x</button>
            {modalMode &&
            <Confirm
                text={`Действительно удалить список "${title}"?`}
                buttonLabel={'Удалить'}
                cancelHandler={() => setModalMode(false)}
                acceptHandler={() => removeCardHandler(card)}
            />}
            <ul>
                {tasks
                    .filter(task => task.cardId === id)
                    .sort((a, b) => a.order - b.order)
                    .map(task =>
                        <TaskPanel
                            key={task.id}
                            task={task}
                            card={card}
                            dragOver={(e: React.DragEvent<HTMLLIElement>) => dragOverHandler(e)}
                            dragLeave={(e: React.DragEvent<HTMLLIElement>) => dragLeaveHandler(e)}
                            dragEnd={(e: React.DragEvent<HTMLLIElement>) => dragEndHandler(e)}
                            dragStart={dragStart}
                            drop={(e: React.DragEvent<HTMLLIElement>) => dropHandler(e)}
                            dragEnter={(e: React.DragEvent<HTMLLIElement>) => dragEnterHandler(e, card, task)}
                        />
                    )
                }
                {/*Переключатель режима создания таски*/}
                {edit ?
                    <li style={{width: 200, height: 150, border: '1px solid black'}}>
                        <p>Введите текст задачи</p>
                        <textarea ref={textRef} autoFocus></textarea>
                        <select value={selected}
                                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelected(e.currentTarget.value as Importance)}>
                            <option value={Importance.Low}>Низкая</option>
                            <option value={Importance.Medium}>Средняя</option>
                            <option value={Importance.High}>Высокая</option>
                        </select>
                        <input type="date" ref={dateRef} defaultValue={getToday()}/>
                        <button
                            onClick={addTaskHandler}
                            style={{width: 200, border: '1px solid black'}}
                        >
                            Создать задачу
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
                            Создать задачу
                        </button>

                    </li>
                }
            </ul>
        </div>
    );
}

export default CardPanel;