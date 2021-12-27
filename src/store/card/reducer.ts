import {Card, CardAction, CardActionTypes} from './types';

export function cardsReducer(state: Array<Card> = [], action: CardAction) {
    switch (action.type) {
        case CardActionTypes.SetCardList: {
            return action.payload;
        }
        case CardActionTypes.CreateCard: {
            return [...state, action.payload];
        }
        case CardActionTypes.PatchCard: {
            return state.map(card => card.id === action.payload.id ? action.payload : card);
        }
        case CardActionTypes.RemoveCard: {
            return state.filter(card => card.id !== action.payload.id);
        }
        default: {
            return state;
        }
    }
}