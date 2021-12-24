export type User = {
    id: number,
    firstName: string,
    lastName: string,
    login: string,
    password: string,
}

export enum UserActions {
    SetUser = 'set_user',
    RemoveUser = 'remove_user',
    CheckUser = 'check_user',
}

export type SetUserAction = {
    type: UserActions.SetUser,
    payload: User
}

export type RemoveUserAction = {
    type: UserActions.RemoveUser
}

export type CheckUserAction = {
    type: UserActions.CheckUser,
    payload: {login : string, password : string, }
}

export type UserAction = SetUserAction | RemoveUserAction | CheckUserAction;