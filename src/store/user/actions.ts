import {Dispatch} from 'redux';
import {RemoveUserAction, SetUserAction, User, UserActions} from './types';

export const setUserAction = (user: User) => (dispatch: Dispatch<SetUserAction>) => {
    dispatch({
        type: UserActions.SetUser,
        payload: user
    });
}

export const removeUserAction = () => (dispatch: Dispatch<RemoveUserAction>) => {
    dispatch({
        type: UserActions.RemoveUser
    });
}