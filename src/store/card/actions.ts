import {Dispatch} from 'redux';
import backend from '../../backend/backend';
import {CardAction, CardActionTypes} from './types';

export const loadCards = () => (dispatch: Dispatch<CardAction>): void => {
    const cards = backend.getCards();
    dispatch({
        type: CardActionTypes.SetCardList,
        payload: cards
    });
}

export const removeCardsFromRedux = () => (dispatch: Dispatch<CardAction>): void => {
    dispatch({
        type: CardActionTypes.SetCardList,
        payload: []
    })
}