import {Dispatch} from 'redux';
import {RemoveUserAction, SetUserAction, UserActionTypes} from './types';
import {isError} from '../../utils/common';
import backend from '../../backend/backend';



export const loginUserAction = (login: string, password: string) => (dispatch: Dispatch<SetUserAction>): string | null => {
    try {
        const user = backend.loginUser(login, password);
        dispatch({
            type: UserActionTypes.SetUser,
            payload: user
        });
    } catch (error) {
        if (isError(error)) return error.message;
    }
    return null;
}

export const logoutUserAction = () => (dispatch: Dispatch<RemoveUserAction>): void => {
    backend.logoutUser();
    dispatch({
        type: UserActionTypes.RemoveUser
    });
}


