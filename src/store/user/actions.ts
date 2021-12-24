import {Dispatch} from 'redux';
import {CheckUserAction, UserActions, LogoutUserAction} from './types';


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


