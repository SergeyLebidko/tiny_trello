import React, {useEffect, useRef, useState} from 'react';
import {getTasks, useTypedSelector} from '../../store/selectors';
import {Card} from '../../store/card/types';
import TaskPanel from '../TaskPanel/TaskPanel';
import TaskCreateForm from '../forms/TaskCreateForm/TaskCreateForm';
import Confirm from '../modals/Confirm/Confirm';
import CardTitleEditForm from '../forms/CardTitleEditForm/CardTitleEditForm';
import {Task} from '../../store/task/types';
import {useDispatch} from 'react-redux';
import {patchTask} from '../../store/task/actions';
import {useImage} from '../../utils/hooks';
import {getNextOrder} from '../../utils/common';
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
    const tasks = useTypedSelector(getTasks);

    const {icons} = useImage();
    const parentElem = useRef<HTMLDivElement>(null);

    const [newTask, setNewTask] = useState<Task | null>(null);

    const [hasEditTitle, setHasEditTitle] = useState<boolean>(false);
    const openEditTitleForm = (): void => setHasEditTitle(true);
    const closeEditTitleForm = (): void => setHasEditTitle(false);

    const [hasConfirmModal, setHasConfirmModal] = useState<boolean>(false);
    const openConfirmModal = (): void => setHasConfirmModal(true);
    const closeConfirmModal = (): void => setHasConfirmModal(false);

    const [hasCreateForm, setHasCreateForm] = useState<boolean>(false);
    const openCreateFrom = (): void => setHasCreateForm(true);
    const closeCreateForm = (): void => setHasCreateForm(false);

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
            order: getNextOrder<Task>(tasks.filter(task => task.cardId === card.id)),
        }));
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

    // Обертка для анимации при удалении Card
    const removeCardHandlerWrap = (card: Card): void => {
        closeConfirmModal();
        parentElem.current?.classList.add('animation_delete');
        setTimeout(() => removeCardHandler(card), 450);
    }

    const {id, title} = card;

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
            {hasEditTitle
                ? <CardTitleEditForm card={card} closeHandler={closeEditTitleForm}/>
                : <>
                    <button className="cardPanel__delete" onClick={openConfirmModal}>
                        <img
                            className="cardPanel__icon_delete"
                            src={icons.iconRemove}
                            alt="delete"
                        />
                    </button>
                    <p className="cardPanel__name" onClick={openEditTitleForm}>{title}</p>
                </>
            }

            {hasConfirmModal &&
            <Confirm
                text={`Удалить список "${title}"?`}
                buttonLabel={'Удалить'}
                cancelHandler={closeConfirmModal}
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
                {hasCreateForm ?
                    <TaskCreateForm card={card} closeHandler={closeCreateForm}/>
                    :
                    <li className="cardPanel__btn_add" onClick={openCreateFrom}>
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