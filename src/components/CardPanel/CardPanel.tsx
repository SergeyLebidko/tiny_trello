import React, {useEffect, useRef, useState} from 'react';
import {Card} from '../../store/card/types';
import {getTasks, useTypedSelector} from '../../store/selectors';
import TaskPanel from '../TaskPanel/TaskPanel';
import {Importance, Task} from '../../store/task/types';
import {useDispatch} from 'react-redux';
import {createTask, patchTask} from '../../store/task/actions';
import Confirm from "../modals/Confirm/Confirm";
import { useImage } from '../../utils/hooks';
import './CardPanel.scss';

type CardPaneProps = {
    card: Card,
    removeCardHandler: (card: Card) => void,
    dragStart: (e: React.DragEvent<HTMLLIElement>, card: Card, task: Task) => void,
    currentCard: Card | null,
    currentTask: Task | null,
}

const CardPanel: React.FC<CardPaneProps> = ({card, removeCardHandler, dragStart, currentCard, currentTask}) => {
    const dispatch = useDispatch();
    const { icons } = useImage();
    const parentElem = useRef<HTMLDivElement>(null);

    const tasks = useTypedSelector(getTasks);

    const [edit, setEdit] = useState<boolean>(false)
    const [selected, setSelected] = useState<Importance>(Importance.Low)
    const [newTask, setNewTask] = useState<Task | null>(null)
    const [modalMode, setModalMode] = useState<boolean>(false);

    const textRef = useRef<HTMLTextAreaElement>(null)
    const dateRef = useRef<HTMLInputElement>(null)

    // Получаем дату в текстовом формате, который требует форма
    const getToday = (): string => {
        const date = new Date(Date.now());
        const d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        const m = date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
        const y = date.getFullYear();
        // Да-да, именно так
        return `${y}-${m}-${d}`
    }

    // Определяем очередь среди тасок
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
        // Обязательно предотвращаем всплытие
        e.stopPropagation()
    }

    function dragLeaveHandler(e: React.DragEvent<HTMLLIElement>) {
        e.currentTarget.className = "taskPanel"
    }

    function dragEndHandler(e: React.DragEvent<HTMLLIElement>) {
        e.currentTarget.className = "taskPanel"
    }

    function dragEnterHandler(e: React.DragEvent<HTMLLIElement>, card: Card, task: Task) {
        // Обязательно предотвращаем всплытие
        e.stopPropagation()
        // Добавление эффектов при наведении на задачу
        e.currentTarget.className = "taskPanel shadowed"
        // Идет проверка условия, при котором будет определяться как перетасовываются карточки
        if (!currentTask) return;
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
        e.currentTarget.className = "taskPanel"
    }

    const cardTaskEnterHandler = (e: React.DragEvent<HTMLDivElement>, card: Card): void => {
        e.preventDefault();
        e.currentTarget.className = "cardPanel"
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
        // Добавление эффектов при наведении на список
        if (e.currentTarget.className === "cardPanel") {
            e.currentTarget.className = "cardPanel shadow"
        }
    }

    function cardTaskLeaveHandler(e: React.DragEvent<HTMLDivElement>) {
        e.currentTarget.className = "cardPanel"
    }

    function cardTaskEndHandler(e: React.DragEvent<HTMLDivElement>) {
        e.currentTarget.className = "cardPanel"
    }

    function cardDropHandler(e: React.DragEvent<HTMLDivElement>) {
        e.currentTarget.className = "cardPanel"
    }

    // Очередь обновляется при каждой новой замененной таске
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

    // Обертка для анимации при удалении Card
    const removeCardHandlerWrap = (card: Card): void => {
        setModalMode(false);
        parentElem.current?.classList.add('animation_delete');
        setTimeout(() => removeCardHandler(card), 450);       
    }

    return (
        // Обработчики списка
        <div
            className="cardPanel"
            ref={parentElem}
            onDragEnter={(e: React.DragEvent<HTMLDivElement>) => cardTaskEnterHandler(e, card)}
            onDragOver={(e: React.DragEvent<HTMLDivElement>) => cardTaskOverHandler(e)}
            onDragLeave={(e: React.DragEvent<HTMLDivElement>) => cardTaskLeaveHandler(e)}
            onDragEnd={(e: React.DragEvent<HTMLDivElement>) => cardTaskEndHandler(e)}
            onDrop={(e: React.DragEvent<HTMLDivElement>) => cardDropHandler(e)}
        >
            <p className="cardPanel__name">{title}</p>
            <button className="cardPanel__delete" onClick={() => setModalMode(true)}>
                <img
                    className="cardPanel__icon_delete"
                    src={icons.iconRemove}
                    alt="delete" 
                />
            </button>

            {/* Модальная форма подтверждения удаления*/}
            {modalMode &&
            <Confirm
                text={`Удалить список "${title}"?`}
                buttonLabel={'Удалить'}
                cancelHandler={() => setModalMode(false)}
                acceptHandler={() => removeCardHandlerWrap(card)}
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
                            // Обработчики таски
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
                    <li className="taskPanel">
                        <p className="taskPanel__name">Введите текст задачи</p>
                        <textarea 
                            className="taskPanel__area"
                            ref={textRef} 
                            autoFocus 
                        />
                        <select 
                            className="taskPanel__select"
                            value={selected}
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelected(e.currentTarget.value as Importance)}
                        >
                            <option value={Importance.Low}>Низкая</option>
                            <option value={Importance.Medium}>Средняя</option>
                            <option value={Importance.High}>Высокая</option>
                        </select>                        
                        <input 
                            className="taskPanel__date"
                            type="date" 
                            ref={dateRef} 
                            defaultValue={getToday()}
                        />
                        <button
                            className="taskPanel__btn_confirm"
                            onClick={addTaskHandler}
                        >
                            <img 
                                className="taskPanel__icon_confirm"
                                src={icons.iconConfirm} 
                                alt="confirm" 
                            />
                        </button>
                        <button
                            className="taskPanel__btn_cancel"
                            onClick={() => setEdit(!edit)}
                        >
                            <img 
                                className="taskPanel__icon_cancel"
                                src={icons.iconCancel} 
                                alt="cancel" 
                            />
                        </button>
                    </li>
                    :
                    <li 
                        className="cardPanel__btn_add"
                        onClick={() => setEdit(!edit)}
                    >   
                        <img 
                            className="cardPanel__icon_add"
                            src={icons.iconAddTask} 
                            alt="add" 
                        />
                    </li>
                }
            </ul>
        </div>
    );
}

export default CardPanel;