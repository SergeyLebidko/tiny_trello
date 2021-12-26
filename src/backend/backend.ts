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

    /* ********** Блок вспомогательных приватных методов ********** */

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

    // Метод получает из localStorage текущего залогиненного пользователя
    private getLoggedUser(): User {
        const user: User = JSON.parse(localStorage.getItem(DataKeys.LoggedUser) || '{}');

        // Если предпринимается попытка выполнить запрос, когда нет залогиненного пользователя - выбрасываем исключение
        if (!user.id) throw new Error('Пользователь не залогинен!');
        return user;
    }

    /* ********** Блок методов для работы с пользователями (сущность User) ********** */

    // Метод регистрирует нового пользователя, выполняет логин, и сразу же возвращает его
    registerUser(userData: User): User {
        const users: Array<User> = JSON.parse(localStorage.getItem(DataKeys.Users) || '[]');
        if (users.some(user => user.login === userData.login)) {
            throw new Error('Пользователь с таким логином уже существует');
        }
        const createdUser = {
            ...userData,
            id: this.getNextId(users)
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

    /* ********** Блок методов для работы с досками (сущность Board) ********** */

    // Метод возвращает список досок пользователя. Текущий залогиненный пользователь извлекается из localStorage
    getBoards(): Array<Board> {
        const user = this.getLoggedUser();
        const boards: Array<Board> = JSON.parse(localStorage.getItem(DataKeys.Boards) || '[]');
        return boards.filter(board => board.userId === user.id);
    }

    // Метод создает в "базе данных" доску и возвращает её (с уже проставленным id).
    createBoard(board: Board): Board {
        // Извлекаем текущего залогиненного пользователя.
        // Если такого нет - будет сразу же выброшено исключение.
        // Методы доступа к данным нельзя выполнять, если пользователь не вошел в систему
        // Мы игнорируем возвращаемый объект, так как предполагаем, что он просто должен существовать
        this.getLoggedUser();

        // Выбираем из "базы данных" список досок и узнаем идентификатор, который должен быть присвоен создаваемой доске
        const boards: Array<Board> = JSON.parse(localStorage.getItem(DataKeys.Boards) || '[]');
        const nextId = this.getNextId(boards);
        const createdBoard = {
            ...board,
            id: nextId
        }
        boards.push(createdBoard);
        localStorage.setItem(DataKeys.Boards, JSON.stringify(boards));
        return createdBoard;
    }

    // Метод принимает объект "доски" с исправленными полями и заменяет им уже существующий в БД объект с тем же идентификатором
    patchBoard(board: Board): Board {
        this.getLoggedUser();
        const boards: Array<Board> = JSON.parse(localStorage.getItem(DataKeys.Boards) || '[]');
        const patchedBoardsList = boards.map(boardFromDb => boardFromDb.id === board.id ? board : boardFromDb);
        localStorage.setItem(DataKeys.Boards, JSON.stringify(patchedBoardsList));
        return board;
    }

    // Метод принимает объект "доски" и удаляет его из БД. Удаленный объект возвращается из метода
    removeBoard(board: Board) {
        this.getLoggedUser();
        const boards: Array<Board> = JSON.parse(localStorage.getItem(DataKeys.Boards) || '[]');
        const patchedBoardsList = boards.filter(boardFromDb => boardFromDb.id !== board.id);
        localStorage.setItem(DataKeys.Boards, JSON.stringify(patchedBoardsList));
        return board;
    }

    /* ********** Блок методов для работы с карточками (сущность Card) ********** */

    // Метод возвращает список карточек залогинившегося пользователя
    getCards(): Array<Card> {
        const boards: Array<Board> = this.getBoards();

        // Получаем из localStorage массив всех карточек
        const cards: Array<Card> = JSON.parse(localStorage.getItem(DataKeys.Cards) || '[]');

        // Возвращаем только те карточки, которые связаны с досками текущего пользователя
        return cards.filter(card => !!boards.find(board => board.id === card.boardId));

    }

    /* ********** Блок методов для работы с задачами (сущность Task) ********** */

    // Метод возвращает список всех задач текущего пользователя
    getTasks(): Array<Task> {
        const cards: Array<Card> = this.getCards();

        // Получаем из localStorage массив всех задач
        const tasks: Array<Task> = JSON.parse(localStorage.getItem(DataKeys.Tasks) || '[]');

        // Возвращаем только те задачи, которые связаны с досками текущего пользователя
        return tasks.filter(task => !!cards.find(card => card.id === task.cardId));
    }

}

const backend = new Backend();

export default backend;
