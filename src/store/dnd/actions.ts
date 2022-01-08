import {ClearDNDObjectAction, DNDActionTypes, SetDNDObjectAction} from './types';
import {Task} from '../task/types';
import {Card} from '../card/types';
import {Dispatch} from 'redux';

export const setDNDObject = (object: Card | Task) => (dispatch: Dispatch<SetDNDObjectAction>) => {
    dispatch({
        type: DNDActionTypes.SetDNDObject,
        payload: object
    });
}

export const clearDNDObject = () => (dispatch: Dispatch<ClearDNDObjectAction>) => {
    dispatch({
        type: DNDActionTypes.ClearDNDObject
    });
}