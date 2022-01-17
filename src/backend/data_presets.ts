import {User} from '../store/user/types';
import {Board} from '../store/board/types';
import {Card} from '../store/card/types';
import {Importance, Task} from '../store/task/types';

export const USERS_PRESET: Array<User> = [
    {
        id: 1,
        firstName: 'Дима',
        lastName: 'Резцов',
        login: 'Dima',
        password: '123'
    },
    {
        id: 2,
        firstName: 'Антон',
        lastName: 'Наумов',
        login: 'Anton',
        password: '123'
    }
];

export const BOARDS_PRESET: Array<Board> = [
    {
        id: 1,
        userId: 1,
        title: 'Изучение React'
    },
    {
        id: 2,
        userId: 1,
        title: 'Изучение TypeScript'
    }
]

export const CARDS_PRESET: Array<Card> = [
    {
        id: 1,
        boardId: 1,
        title: 'Выполнено',
        order: 0
    },
    {
        id: 2,
        boardId: 1,
        title: 'В процессе',
        order: 1
    },
    {
        id: 3,
        boardId: 1,
        title: 'Надо изучить',
        order: 2
    },
    {
        id: 4,
        boardId: 2,
        title: 'Уже изучил',
        order: 0
    },
    {
        id: 5,
        boardId: 2,
        title: 'Сейчас разбираюсь',
        order: 1
    },
    {
        id: 6,
        boardId: 2,
        title: 'На будущее',
        order: 2
    }
]

export const TASKS_PRESET: Array<Task> = [
    {
        id: 1,
        cardId: 1,
        title: 'Прочитать общие сведения о React',
        done: true,
        importance: Importance.Medium,
        deadline: new Date('08.15.2021').getTime(),
        order: 0
    },
    {
        id: 2,
        cardId: 1,
        title: 'Разобраться с синтаксисом JSX',
        done: true,
        importance: Importance.High,
        deadline: new Date('08.25.2021').getTime(),
        order: 1
    },
    {
        id: 3,
        cardId: 1,
        title: 'Узнать о классовых компонентах',
        done: true,
        importance: Importance.Medium,
        deadline: new Date('08.18.2021').getTime(),
        order: 2
    },
    {
        id: 4,
        cardId: 2,
        title: 'Изучить хуки',
        done: false,
        importance: Importance.High,
        deadline: new Date('09.01.2021').getTime(),
        order: 0
    },
    {
        id: 5,
        cardId: 2,
        title: 'Разобраться с роутингом',
        done: false,
        importance: Importance.Low,
        deadline: new Date('09.10.2021').getTime(),
        order: 1
    },
    {
        id: 6,
        cardId: 3,
        title: 'Разобраться с render-props',
        done: false,
        importance: Importance.High,
        deadline: new Date('10.01.2021').getTime(),
        order: 0
    },
    {
        id: 7,
        cardId: 3,
        title: 'Использование HOC',
        done: false,
        importance: Importance.Low,
        deadline: new Date('10.05.2021').getTime(),
        order: 1
    },
    {
        id: 8,
        cardId: 4,
        title: 'Что такое типы',
        done: true,
        importance: Importance.High,
        deadline: new Date('10.10.2021').getTime(),
        order: 0
    },
    {
        id: 9,
        cardId: 4,
        title: 'Что такое интерфейсы',
        done: true,
        importance: Importance.High,
        deadline: new Date('10.10.2021').getTime(),
        order: 1
    },
    {
        id: 10,
        cardId: 4,
        title: 'Что такое перечисления',
        done: true,
        importance: Importance.Low,
        deadline: new Date('10.10.2021').getTime(),
        order: 2
    },
    {
        id: 11,
        cardId: 5,
        title: 'Что такое класс',
        done: false,
        importance: Importance.Medium,
        deadline: new Date('10.20.2021').getTime(),
        order: 0
    },
    {
        id: 12,
        cardId: 5,
        title: 'Что такое обобщения и обощенные функции',
        done: false,
        importance: Importance.Medium,
        deadline: new Date('10.20.2021').getTime(),
        order: 1
    },
];