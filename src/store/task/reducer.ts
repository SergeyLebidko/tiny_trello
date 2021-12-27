import {Task, TaskAction, TaskActionTypes} from './types';

export function tasksReducer(state: Array<Task> = [], action: TaskAction) {
    switch (action.type) {
        case TaskActionTypes.SetTaskList: {
            return action.payload;
        }
        case TaskActionTypes.CreateTask: {
            return [...state, action.payload];
        }
        case TaskActionTypes.PatchTask: {
            return state.map(task => task.id === action.payload.id ? action.payload : task);
        }
        case TaskActionTypes.RemoveTask: {
            return state.filter(task => task.id !== action.payload.id);
        }
        default: {
            return state;
        }
    }
}