import {Dispatch} from 'redux';
import {User, UserAction, UserActionTypes} from './types';
import {isError} from '../../utils/common';
import backend from '../../backend/backend';

// Экшн нужен для случая, когда в localStorage уже существует залогинившийся пользователь и теперь его надо прописать в redux
export const setUser = (user: User) => (dispatch: Dispatch<UserAction>): void => {
    dispatch({
        type: UserActionTypes.SetUser,
        payload: user
    })
}

export const registerUserAction = (user: User) => (dispatch: Dispatch<UserAction>): string | null => {
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

export const loginUserAction = (login: string, password: string) => (dispatch: Dispatch<UserAction>): string | null => {
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

export const logoutUserAction = () => (dispatch: Dispatch<UserAction>): void => {
    backend.logoutUser();
    dispatch({
        type: UserActionTypes.RemoveUser
    });
}