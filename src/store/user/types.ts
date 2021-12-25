export type User = {
    id?: number,
    login: string,
    password: string,
    firstName: string,
    lastName: string
}

export enum UserActions {
    LogoutUser = 'LOGOUT_USER',
    CheckUser = 'CHECK_USER',
}

export type LogoutUserAction = {
    type: UserActions.LogoutUser
}

export type CheckUserAction = {
    type: UserActions.CheckUser,
    payload: {login : string, password : string, }
}
//Объединяем все типы экшенов для простоты вставки
export type UserAction =  LogoutUserAction | CheckUserAction;