import {Dispatch} from 'redux';
import {RemoveUserAction, SetUserAction, User, UserActionTypes} from './types';
import {isError} from '../../utils/common';
import backend from '../../backend/backend';

export const registerUserAction = (user: User) => (dispatch: Dispatch<SetUserAction>): string | null => {
    try {
        const createdUser = backend.registerUser(user);
        dispatch({
            type: UserActionTypes.SetUser,
            payload: createdUser
        });
    } catch (error) {
        if (isError(error)) return error.message;
    }
    return null;
}

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


