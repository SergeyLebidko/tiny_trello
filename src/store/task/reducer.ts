import {Task, TaskAction, TaskActionTypes} from './types';

export function tasksReducer(state: Array<Task> = [], action: TaskAction){
    switch (action.type) {
        case TaskActionTypes.SetTaskList: {
            return action.payload;
        }
        //TODO Дополнить редьюсер кодом для выполнения других операций со списоком задач
        default: {
            return state;
        }
    }
}