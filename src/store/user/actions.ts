import {Dispatch} from 'redux';
import {User, UserAction, UserActionTypes} from './types';
import {BoardAction, BoardActionTypes} from '../board/types';
import {CardAction, CardActionTypes} from '../card/types';
import {isError} from '../../utils/common';
import backend from '../../backend/backend';
import {TaskAction, TaskActionTypes} from "../task/types";

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

export const logoutUserAction = () => (dispatch: Dispatch<UserAction | BoardAction | CardAction | TaskAction>): void => {
    backend.logoutUser();

    // Удаляем из хранилища redux данные пользователя
    dispatch({
        type: UserActionTypes.RemoveUser
    });

    // Удаляем из хранилища redux список досок
    dispatch({
        type: BoardActionTypes.SetBoardList,
        payload: []
    });

    // Удаляем из хранилища redux список карточек
    dispatch({
        type: CardActionTypes.SetCardList,
        payload: []
    });

    // Удаляем из хранилища redux список задач
    dispatch({
        type: TaskActionTypes.SetTaskList,
        payload: []
    });
}


