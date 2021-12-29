export type User = {
    id?: number,
    login: string,
    password: string,
    firstName: string,
    lastName: string
}

export enum UserActionTypes {
    SetUser = 'SET_USER',
    RemoveUser = 'REMOVE_USER',
}

export type SetUserAction = {
    type: UserActionTypes.SetUser,
    payload: User
}

export type RemoveUserAction = {
    type: UserActionTypes.RemoveUser
}

//Объединяем все типы экшенов для простоты вставки
export type UserAction =  SetUserAction | RemoveUserAction;