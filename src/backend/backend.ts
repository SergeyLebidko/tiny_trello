import {BOARDS_PRESET, CARDS_PRESET, TASKS_PRESET, USERS_PRESET} from './data_presets';
import {User} from '../store/user/types';
import {Board} from '../store/board/types';
import {Card} from '../store/card/types';
import {Task} from '../store/task/types';

enum DataKeys {
    LoggedUser = 'LOGGED_USER',
    Users = 'USERS',
    Boards = 'BOARDS',
    Cards = 'Cards',
    Tasks = 'Tasks'
}

class Backend {

    constructor() {
        // В конструкторе сразу же проверяем, есть ли уже какие-то данные в localStorage.
        // Если нет - сбрасываем данные залогинившегося пользователя и сохраням в localStorage данные из data_presets
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

    // Метод получает свободный идентификатор для переданного ключа
    // Например мы создаем нового пользователя и должны присвоить ему такой id, которого еще нет в базе.
    // Этот метод вернет его, если передать ему ключ DataKeys.Users
    private getNextId(dataSet: Array<User | Board | Card | Task>): number {
        let result = 1;
        if (dataSet.length) {
            result = 1 + Math.max(...dataSet.map(e => e.id || 0));
        }
        return result;
    }

    // Метод регистрирует нового пользователя и сразе же возвращает его
    registerUser(userData: User): User {
        const users: Array<User> = JSON.parse(localStorage.getItem(DataKeys.Users) || '[]');
        const createdUser = {
            id: this.getNextId(users),
            ...userData
        }
        users.push(createdUser);
        localStorage.setItem(DataKeys.Users, JSON.stringify(users));
        return createdUser;
    }
}

const backend = new Backend();

export default backend;
