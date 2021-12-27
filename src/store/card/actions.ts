import {Dispatch} from 'redux';
import backend from '../../backend/backend';
import {Card, CardAction, CardActionTypes} from './types';

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

export const removeCard = (card: Card) => (dispatch: Dispatch<CardAction>): void => {
    const removedCard = backend.removeCard(card);
    dispatch({
        type: CardActionTypes.RemoveCard,
        payload: removedCard
    });
}

export const removeCardsFromRedux = () => (dispatch: Dispatch<CardAction>): void => {
    dispatch({
        type: CardActionTypes.SetCardList,
        payload: []
    })
}