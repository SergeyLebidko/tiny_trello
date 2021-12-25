import {BOARDS_PRESET, CARDS_PRESET, TASKS_PRESET, USERS_PRESET} from './data_presets';
import {User} from '../store/user/types';
import {Board} from '../store/board/types';
import {Card} from '../store/card/types';
import {Task} from '../store/task/types';

export enum DataKeys {
    LoggedUser = 'LOGGED_USER',
    Users = 'USERS',
    Boards = 'BOARDS',
    Cards = 'CARDS',
    Tasks = 'TASKS'
}

// Класс реализует бэкенд на основе localStorage
class Backend {

    constructor() {
        // В конструкторе сразу же проверяем, есть ли уже какие-то данные в localStorage.
        // Если хоть чего-то нет, то удаляем данные залогинившегося пользователя и сохраням в localStorage данные из data_presets
        const usersRaw = localStorage.getItem(DataKeys.Users);
        const boardsRaw = localStorage.getItem(DataKeys.Boards);
        const cardsRaw = localStorage.getItem(DataKeys.Cards);
        const tasksRaw = localStorage.getItem(DataKeys.Tasks);
        if (!usersRaw || !boardsRaw || !cardsRaw || !tasksRaw) {
            localStorage.removeItem(DataKeys.LoggedUser);
            localStorage.setItem(DataKeys.Users, JSON.stringify(USERS_PRESET));
            localStorage.setItem(DataKeys.Boards, JSON.stringify(BOARDS_PRESET));
            localStorage.setItem(DataKeys.Cards, JSON.stringify(CARDS_PRESET));
            localStorage.setItem(DataKeys.Tasks, JSON.stringify(TASKS_PRESET));
        }
    }

    // Метод получает свободный идентификатор для переданного списка объектов
    // Например мы создаем нового пользователя и должны присвоить ему такой id, которого еще нет в базе.
    // Этот метод вернет его, если передать список пользователей
    private getNextId(dataSet: Array<User | Board | Card | Task>): number {
        let result = 1;
        if (dataSet.length) {
            result = 1 + Math.max(...dataSet.map(e => e.id || 0));
        }
        return result;
    }

    // Метод регистрирует нового пользователя, выполняет логин, и сразу же возвращает его
    registerUser(userData: User): User {
        const users: Array<User> = JSON.parse(localStorage.getItem(DataKeys.Users) || '[]');
        if (users.some(user => user.login === userData.login)) {
            throw new Error('Пользователь с таким логином уже существует');
        }
        const createdUser = {
            id: this.getNextId(users),
            ...userData
        }
        users.push(createdUser);
        localStorage.setItem(DataKeys.Users, JSON.stringify(users));
        localStorage.setItem(DataKeys.LoggedUser, JSON.stringify(createdUser));
        return createdUser;
    }

    // Метод выполняет логин: проверят переданные логин и пароль, находит по этим данным пользователя и возвращает его
    loginUser(login: string, password: string): User {
        const users: Array<User> = JSON.parse(localStorage.getItem(DataKeys.Users) || '[]');
        const user = users.find(user => user.login === login && user.password === password);
        if (user) {
            localStorage.setItem(DataKeys.LoggedUser, JSON.stringify(user));
            return user;
        }
        throw new Error('Пользователь с такими логином и паролем не найден');
    }

    // Метод выполняет logout: убирает из localStorage данные по выполнившему вход пользователю
    logoutUser(): void {
        localStorage.removeItem(DataKeys.LoggedUser)
    }
}

const backend = new Backend();

export default backend;
