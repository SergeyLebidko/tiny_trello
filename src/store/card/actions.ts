import {Dispatch} from 'redux';
import backend from '../../backend/backend';
import {Card, CardAction, CardActionTypes} from './types';
import {TaskAction, TaskActionTypes} from '../task/types';
import {RootState} from '../store';

export const loadCards = () => (dispatch: Dispatch<CardAction>): void => {
    const cards = backend.getCards();
    dispatch({
        type: CardActionTypes.SetCardList,
        payload: cards
    });
}

export const createCard = (card: Card) => (dispatch: Dispatch<CardAction>): void => {
    const createdCard = backend.createCard(card);
    dispatch({
        type: CardActionTypes.CreateCard,
        payload: createdCard
    });
}

export const patchCard = (card: Card) => (dispatch: Dispatch<CardAction>): void => {
    const patchedCard = backend.patchCard(card);
    dispatch({
        type: CardActionTypes.PatchCard,
        payload: patchedCard
    })
}

export const removeCard = (card: Card) => (dispatch: Dispatch<CardAction | TaskAction>, getState: () => RootState): void => {
    const removedCard = backend.removeCard(card);
    dispatch({
        type: CardActionTypes.RemoveCard,
        payload: removedCard
    });

    // После того, как удалили карточку - удаляем из хранилища все связанные с ней задачи
    dispatch({
        type: TaskActionTypes.SetTaskList,
        payload: getState().tasks.filter(task => task.cardId !== removedCard.id)
    });
}

export const removeCardsFromRedux = () => (dispatch: Dispatch<CardAction>): void => {
    dispatch({
        type: CardActionTypes.SetCardList,
        payload: []
    })
}