import {RemoveUserAction, SetUserAction, User, UserActions} from './types';

export function userReducer(state: User | null = null, action: SetUserAction | RemoveUserAction): User | null {
    switch (action.type) {
        case UserActions.SetUser: {
            return action.payload;
        }
        case UserActions.RemoveUser: {
            return null;
        }
        default: {
            return state;
        }
    }
}