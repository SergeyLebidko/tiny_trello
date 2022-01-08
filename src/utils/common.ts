import {LETTERS, ALL_LETTERS} from '../constants/settings';
import {Card} from '../store/card/types';
import {Task} from '../store/task/types';

const randomChar = (sequence: string): string => sequence[Math.floor(Math.random() * sequence.length)];

// Функция возвращает случайную строку. Если hasNoDigits равен true, то строка будет содержать только буквы
export function createRandomString(size = 8, hasNoDigits = true): string {
    const result = [];
    for (let index = 0; index < size; index++) {
        if (hasNoDigits) {
            result.push(randomChar(LETTERS));
            continue;
        }
        result.push(randomChar(ALL_LETTERS));
    }
    return result.join('');
}

// Защита типа для корректного чтения сообщений об ошибках в блоках catch
export function isError(e: unknown): e is Error {
    return e instanceof Error;
}

// Защита типа для определения Card
export function isCard(e: Task | Card | null): e is Card {
    return e !== null && ('boardId' in e);
}

// Защита типа для определения Task
export function isTask(e: Task | Card | null): e is Task {
    return e !== null && ('cardId' in e);
}

// Функция получения следующего значения поля порядка
export function getNextOrder<T extends Card | Task>(objects: Array<T>): number {
    let result = 0;
    if(objects.length > 0){
        result = Math.max(...objects.map(object => object.order)) + 1;
    }
    return result;
}

// Функция возвращает массив с частями даты (день, месяц, год) для переданного timestamp
export function getDateParts (timestamp: number): Array<string> {
    const date = new Date(timestamp);
    const d = '' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
    const m = '' + (date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    const y = '' + date.getFullYear();
    return [d, m, y];
}
