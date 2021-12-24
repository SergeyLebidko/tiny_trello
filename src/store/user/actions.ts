import {Dispatch} from 'redux';
import {RemoveUserAction, SetUserAction, CheckUserAction, User, UserActions} from './types';

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

export const checkUserAction = (login : string,password : string) => (dispatch: Dispatch<CheckUserAction>) => {
    dispatch({
        type: UserActions.CheckUser,
        payload: {login,password}
    });
}


