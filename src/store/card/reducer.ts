import {Card, CardAction, CardActionTypes} from './types';

export function cardsReducer(state: Array<Card> = [], action: CardAction){
    switch (action.type) {
        case CardActionTypes.SetCardList: {
            return action.payload;
        }
        //TODO Дополнить редьюсер кодом для выполнения других операций со списоком карточек
        default: {
            return state;
        }
    }
}