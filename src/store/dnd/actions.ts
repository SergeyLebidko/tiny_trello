import {ClearDNDObjectAction, DNDActionTypes, SetDNDCardAction, SetDNDTaskAction,} from './types';
import {Task} from '../task/types';
import {Card} from '../card/types';
import {Dispatch} from 'redux';

export const setDNDTask = (object: Task) => {
    return (dispatch: Dispatch<SetDNDTaskAction>) => {
        dispatch({
            type: DNDActionTypes.SetDNDTask,
            payload: object
        });
    };
}

export const setDNDCard = (object: Card) => (dispatch: Dispatch<SetDNDCardAction>) => {
    dispatch({
        type: DNDActionTypes.SetDNDCard,
        payload: object
    });
}

export const clearDNDObject = () => (dispatch: Dispatch<ClearDNDObjectAction>) => {
    dispatch({
        type: DNDActionTypes.ClearDNDObject
    });
}