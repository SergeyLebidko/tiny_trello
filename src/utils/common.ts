import {LETTERS, ALL_LETTERS} from '../constants/settings';

const randomChar = (sequence: string): string => sequence[Math.floor(Math.random() * sequence.length)];

// Функция возвращает случайную строку. Если hasNoDigits равен true, то строка будет содержать только буквы
export function createRandomString(size = 8, hasNoDigits = true): string {
    const result = [];
    for (let index = 0; index < size; index++) {
        if (result.length === 0) {
            if (hasNoDigits) {
                result.push(randomChar(LETTERS));
                continue;
            }
            result.push(randomChar(ALL_LETTERS));
        }
    }

    return result.join('');
}