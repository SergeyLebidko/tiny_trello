import {BOARDS_PRESET, CARDS_PRESET, TASKS_PRESET, USERS_PRESET} from './data_presets';

const LOGGED_USER_KEY = 'LOGGED_USER';
const USERS_KEY = 'USERS';
const BOARDS_KEY = 'BOARDS';
const CARDS_KEY = 'CARDS';
const TASKS_KEY = 'TASKS';

class Backend {

    constructor() {
        // В конструкторе сразу же проверяем, есть ли уже какие-то данные в localStorage.
        // Если нет - сбрасываем данные залогинившегося пользователя и сохраням в localStorage данные из data_presets
        const usersRaw = localStorage.getItem(USERS_KEY);
        const boardsRaw = localStorage.getItem(BOARDS_KEY);
        const cardsRaw = localStorage.getItem(CARDS_KEY);
        const tasksRaw = localStorage.getItem(TASKS_KEY);
        if (!usersRaw || !boardsRaw || !cardsRaw || !tasksRaw) {
            localStorage.removeItem(LOGGED_USER_KEY);
            localStorage.setItem(USERS_KEY, JSON.stringify(USERS_PRESET));
            localStorage.setItem(BOARDS_KEY, JSON.stringify(BOARDS_PRESET));
            localStorage.setItem(CARDS_KEY, JSON.stringify(CARDS_PRESET));
            localStorage.setItem(TASKS_KEY, JSON.stringify(TASKS_PRESET));
        }
    }

}

const backend = new Backend();

export default backend;
