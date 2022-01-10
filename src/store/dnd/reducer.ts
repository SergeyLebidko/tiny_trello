import {DNDAction, DNDActionTypes, DndObjects} from './types';


export function dndReducer(state: DndObjects = {dndTask: null, dndCard: null}, action: DNDAction): DndObjects {
    switch (action.type) {
        case DNDActionTypes.SetDNDTask: {
            return {...state, dndTask: action.payload } ;
        }
        case DNDActionTypes.SetDNDCard: {
            return {...state, dndCard: action.payload };
        }
        case DNDActionTypes.ClearDNDObject: {
            return {dndTask: null, dndCard: null};
        }
        default: {
            return state
        }
    }
}