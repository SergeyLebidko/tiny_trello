export type User = {
    firstName: string,
    lastName: string
}

export enum UserActions {
    SetUser = 'set_user',
    RemoveUser = 'remove_user'
}

export type SetUserAction = {
    type: UserActions.SetUser,
    payload: User
}

export type RemoveUserAction = {
    type: UserActions.RemoveUser
}