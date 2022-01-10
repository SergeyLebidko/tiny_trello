export enum Importance {
    Low = 'LOW',
    Medium = 'Medium',
    High = 'HIGH'
}

export type Task = {
    id?: number,
    cardId: number,
    title: string,
    done: boolean,
    importance: Importance
    deadline: number,
    order: number
}

export enum TaskActionTypes {
    SetTaskList = 'SET_TASK_LIST',
    CreateTask = 'CREATE_TASK',
    PatchTask = 'PATCH_TASK',
    RemoveTask = 'REMOVE_TASK'
}

export type SetTaskListAction = {
    type: TaskActionTypes.SetTaskList,
    payload: Array<Task>
}

export type CreateTaskAction = {
    type: TaskActionTypes.CreateTask,
    payload: Task
}

export type PatchTaskAction = {
    type: TaskActionTypes.PatchTask,
    payload: Task
}

export type RemoveTaskAction = {
    type: TaskActionTypes.RemoveTask,
    payload: Task
}

//Объединяем все типы экшенов для простоты вставки
export type TaskAction = SetTaskListAction | CreateTaskAction | PatchTaskAction | RemoveTaskAction;