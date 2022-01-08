import {Card} from '../card/types';
import {Task} from '../task/types';

export enum DNDActionTypes {
    SetDNDObject,
    ClearDNDObject
}

export type SetDNDObjectAction = {
    type: DNDActionTypes.SetDNDObject,
    payload: Card | Task 
}

export type ClearDNDObjectAction = {
    type: DNDActionTypes.ClearDNDObject
}

export type DNDAction = SetDNDObjectAction | ClearDNDObjectAction;