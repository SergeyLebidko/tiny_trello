import {User, UserAction, UserActionTypes} from './types';

export function userReducer(state: null | User = null, action: UserAction): null | User {
    switch (action.type) {
        case UserActionTypes.SetUser: {
            return action.payload;
        }
        case UserActionTypes.RemoveUser: {
            return null;
        }
        default: {
            return state;
        }
    }
}