import {UserAction, User, UserActions} from './types';


interface IState {
    users: User[] | [],
    loggedUser: number | null,
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
    loggedUser: null,
};


function ValidateUser(users: User[], login: string, password: string ) : number | null {

    const index : number = users.findIndex((user) => user.login === login && user.password === password)

    if (index === -1) {
        localStorage.setItem('activeUser', `null`);
        return null;
    }
    localStorage.setItem('activeUser', `${index}`);
    return index;
}


export function userReducer(state= initialState, action: UserAction): IState {
    console.log(action);

    switch (action.type) {
        case UserActions.LogoutUser: {
            return {...state, loggedUser: null};
        }
        case UserActions.CheckUser: {
            return {...state, loggedUser: ValidateUser(state.users, action.payload.login, action.payload.password)}
        }
        default: {
            return state;
        }
    }
}