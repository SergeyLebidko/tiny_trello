export type User = {
    id: number,
    firstName: string,
    lastName: string,
    login: string,
    password: string,
}

export enum UserActions {
    SetUser = 'set_user',
    LogoutUser = 'logout_user',
    CheckUser = 'check_user',
}

export type SetUserAction = {
    type: UserActions.SetUser,
    payload: User
}

export type LogoutUserAction = {
    type: UserActions.LogoutUser
}

export type CheckUserAction = {
    type: UserActions.CheckUser,
    payload: {login : string, password : string, }
}

export type UserAction = SetUserAction | LogoutUserAction | CheckUserAction;