import {UserAction, User, UserActions} from './types';


interface IState {
    users: User[] | [],
    loggedUser: number,
}

// Начальное состояние
const initialState : IState = {
    users: [
        {
            id: 1,
            firstName: 'Вася',
            lastName: 'Ложкин',
            login: 'Vasya',
            password: '321',
        },
        {
            id: 2,
            firstName: 'Дима',
            lastName: 'Резцов',
            login: 'Dima',
            password: '123',
        },
    ],
    loggedUser: 0,
};


function ValidateUser(users: User[], login: string, password: string ) : number {

    const index : number = users.findIndex((user) => user.login === login && user.password === password)

    if (index === -1) {
        return 0;
    }

    return users[index].id;
}


export function userReducer(state= initialState, action: UserAction): IState {
    console.log(action);

    switch (action.type) {
        case UserActions.LogoutUser: {
            return {...state, loggedUser: 0};
        }
        case UserActions.CheckUser: {
            return {...state, loggedUser: ValidateUser(state.users, action.payload.login, action.payload.password)}
        }
        default: {
            return state;
        }
    }
}