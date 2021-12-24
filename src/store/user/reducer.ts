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

    const logged = users.findIndex((user) => {
        if (user.login === login && user.password === password) {
            return user.id
        }
    })
    if (logged === -1) {
        return 0;
    }
    return logged;
}


export function userReducer(state= initialState, action: UserAction): IState {
    console.log(action);

    switch (action.type) {
        // case UserActions.SetUser: {
        //     return action.payload;
        // }
        // case UserActions.RemoveUser: {
        //     return null;
        // }
        case UserActions.CheckUser: {
            return {...state, loggedUser: ValidateUser(state.users, action.payload.login, action.payload.password)}
        }
        default: {
            return state;
        }
    }
}