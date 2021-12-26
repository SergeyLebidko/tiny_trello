export enum Importance {
    Low = 'LOW',
    Medium = 'Medium',
    High = 'HIGH'
}

export type Task = {
    id?: number,
    cardId: number,
    text: string,
    done: boolean,
    importance: Importance
    deadline: number,
    order: number
}

export enum TaskActionTypes {
    SetTaskList = 'SET_TASK_LIST'
}

export type SetTaskListAction = {
    type: TaskActionTypes.SetTaskList,
    payload: Array<Task>
}

//TODO Дополнить перечень экшенами для выполнения операций удаления, создания, правки и т.д...

//Объединяем все типы экшенов для простоты вставки
export type TaskAction = SetTaskListAction;