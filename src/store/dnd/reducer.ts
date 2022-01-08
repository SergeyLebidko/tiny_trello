import {Card} from '../card/types';
import {Task} from '../task/types';
import {DNDAction, DNDActionTypes} from './types';

export function dndReducer(state: Card | Task | null = null, action: DNDAction): Card | Task | null {
    switch (action.type) {
        case DNDActionTypes.SetDNDObject: {
            return action.payload;
        }
        case DNDActionTypes.ClearDNDObject: {
            return null;
        }
        default: {
            return state
        }
    }
}