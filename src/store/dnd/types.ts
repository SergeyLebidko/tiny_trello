import {Card} from '../card/types';
import {Task} from '../task/types';

export enum DNDActionTypes {
    SetDNDTask,
    SetDNDCard,
    ClearDNDObject,
}

export type DndObjects = {
    dndTask: Task | null,
    dndCard: Card | null,
}

export type SetDNDTaskAction = {
    type: DNDActionTypes.SetDNDTask,
    payload: Task
}

export type SetDNDCardAction = {
    type: DNDActionTypes.SetDNDCard,
    payload: Card
}

export type ClearDNDObjectAction = {
    type: DNDActionTypes.ClearDNDObject
}

export type DNDAction = SetDNDTaskAction | SetDNDCardAction | ClearDNDObjectAction;