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

    private getNextId(dataSet: Array<User | Board | Card | Task>): number {
        let result = 1;
        if (dataSet.length) {
            result = 1 + Math.max(...dataSet.map(e => e.id || 0));
        }
        return result;
    }

    private getLoggedUser(): User {
        const user: User = JSON.parse(localStorage.getItem(DataKeys.LoggedUser) || '{}');

        // Если предпринимается попытка выполнить запрос, когда нет залогиненного пользователя - выбрасываем исключение
        if (!user.id) throw new Error('Пользователь не залогинен!');
        return user;
    }

    private get<T extends Board | Card | Task>(dataKey: DataKeys): Array<T> {
        const user = this.getLoggedUser();
        const entityList: Array<T> = JSON.parse(localStorage.getItem(dataKey) || '[]');
        if (dataKey === DataKeys.Boards) {
            return entityList.filter(board => (board as Board).userId === user.id);
        }
        if (dataKey === DataKeys.Cards) {
            const boards = this.get(DataKeys.Boards);
            return entityList.filter(card => !!boards.find(board => board.id === (card as Card).boardId));
        }
        if (dataKey === DataKeys.Tasks) {
            const cards = this.get(DataKeys.Cards);
            return entityList.filter(task => !!cards.find(card => card.id === (task as Task).cardId));
        }
        throw new Error('Неизвестный тип сущности');
    }

    private create<T extends Board | Card | Task>(element: T, dataKey: DataKeys): T {
        // Извлекаем текущего залогиненного пользователя.
        // Если такого нет - будет сразу же выброшено исключение.
        // Методы доступа к данным нельзя выполнять, если пользователь не вошел в систему
        // Мы игнорируем возвращаемый объект, так как предполагаем, что он просто должен существовать
        this.getLoggedUser();

        // Выбираем из "базы данных" список элементов заданного типа и узнаем идентификатор, который должен быть присвоен создаваемому элементу
        const elementsInBase: Array<T> = JSON.parse(localStorage.getItem(dataKey) || '[]');
        const nextId = this.getNextId(elementsInBase);
        const createdElement: T = {
            id: nextId,
            ...element,
        }
        elementsInBase.push(createdElement);
        localStorage.setItem(dataKey, JSON.stringify(elementsInBase));
        return createdElement;
    }

    private patch<T extends Board | Card | Task>(element: T, dataKey: DataKeys): T {
        this.getLoggedUser();
        const elementsInBase: Array<T> = JSON.parse(localStorage.getItem(dataKey) || '[]');
        const updatedElementList = elementsInBase.map(elementInBase => elementInBase.id === element.id ? element : elementInBase);
        localStorage.setItem(dataKey, JSON.stringify(updatedElementList));
        return element;
    }

    private remove<T extends Board | Card | Task>(element: T, dataKey: DataKeys): T {
        this.getLoggedUser();
        const elementsInBase: Array<T> = JSON.parse(localStorage.getItem(dataKey) || '[]');
        const updatedElementList = elementsInBase.filter(elementsInBase => elementsInBase.id !== element.id);
        if (dataKey === DataKeys.Cards) {
            const tasks: Array<Task> = JSON.parse(localStorage.getItem(DataKeys.Tasks) || '[]');
            tasks.forEach(task => {
                if (task.cardId === element.id) {
                    this.remove<Task>(task, DataKeys.Tasks);
                }
            });
        } else if (dataKey === DataKeys.Boards) {
            const cards: Array<Card> = JSON.parse(localStorage.getItem(DataKeys.Cards) || '[]');
            cards.forEach(card => {
                if (card.boardId === element.id) {
                    this.remove<Card>(card, DataKeys.Cards);
                }
            });
        } else if (dataKey !== DataKeys.Tasks) {
            throw new Error('Неизвестный тип сущности!');
        }

        localStorage.setItem(dataKey, JSON.stringify(updatedElementList));
        return element;
    }

    /* ********** Блок методов для работы с пользователями (сущность User) ********** */

    // Метод регистрирует нового пользователя, выполняет логин, и сразу же возвращает его
    public registerUser(userData: User): User {
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
    public loginUser(login: string, password: string): User {
        const users: Array<User> = JSON.parse(localStorage.getItem(DataKeys.Users) || '[]');
        const user = users.find(user => user.login === login && user.password === password);
        if (user) {
            localStorage.setItem(DataKeys.LoggedUser, JSON.stringify(user));
            return user;
        }
        throw new Error('Пользователь с такими логином и паролем не найден');
    }

    // Метод выполняет logout: убирает из localStorage данные по выполнившему вход пользователю
    public logoutUser(): void {
        localStorage.removeItem(DataKeys.LoggedUser)
    }

    /* ********** Блок методов для работы с досками (сущность Board) ********** */

    public getBoards(): Array<Board> {
        return this.get<Board>(DataKeys.Boards);
    }

    public createBoard(board: Board): Board {
        return this.create<Board>(board, DataKeys.Boards);
    }

    public patchBoard(board: Board): Board {
        return this.patch<Board>(board, DataKeys.Boards);
    }

    public removeBoard(board: Board) {
        return this.remove<Board>(board, DataKeys.Boards);
    }

    /* ********** Блок методов для работы с карточками (сущность Card) ********** */

    public getCards(): Array<Card> {
        return this.get<Card>(DataKeys.Cards);
    }

    public createCard(card: Card): Card {
        return this.create<Card>(card, DataKeys.Cards);
    }

    public patchCard(card: Card): Card {
        return this.patch<Card>(card, DataKeys.Cards);
    }

    public removeCard(card: Card): Card {
        return this.remove<Card>(card, DataKeys.Cards);
    }

    /* ********** Блок методов для работы с задачами (сущность Task) ********** */

    public getTasks(): Array<Task> {
        return this.get<Task>(DataKeys.Tasks);
    }

    public createTask(task: Task): Task {
        return this.create<Task>(task, DataKeys.Tasks);
    }

    public patchTask(task: Task): Task {
        return this.patch<Task>(task, DataKeys.Tasks);
    }

    public removeTask(task: Task): Task {
        return this.remove<Task>(task, DataKeys.Tasks);
    }
}

const backend = new Backend();

export default backend;
