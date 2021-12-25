export type User = {
    id: number,
    firstName: string,
    lastName: string,
    login: string,
    password: string,
}

export enum UserActions {
    LogoutUser = 'logout_user',
    CheckUser = 'check_user',
}

export type LogoutUserAction = {
    type: UserActions.LogoutUser
}

export type CheckUserAction = {
    type: UserActions.CheckUser,
    payload: {login : string, password : string, }
}

export type UserAction =  LogoutUserAction | CheckUserAction;