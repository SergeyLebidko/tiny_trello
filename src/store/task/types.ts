export enum Importance {
    Low = 'LOW',
    Medium = 'Medium',
    High = 'HIGH'
}

export type Task = {
    id: number,
    cardId: number,
    text: string,
    done: boolean,
    importance: Importance
    deadline: number,
    order: number
}