import {Dispatch} from 'redux';
import {SetUserAction, CheckUserAction, User, UserActions, LogoutUserAction} from './types';

export const setUserAction = (user: User) => (dispatch: Dispatch<SetUserAction>) => {
    dispatch({
        type: UserActions.SetUser,
        payload: user
    });
}

export const logoutUserAction = () => (dispatch: Dispatch<LogoutUserAction>) => {
    dispatch({
        type: UserActions.LogoutUser
    });
}

export const checkUserAction = (login : string,password : string) => (dispatch: Dispatch<CheckUserAction>) => {
    dispatch({
        type: UserActions.CheckUser,
        payload: {login,password}
    });
}


