import {Dispatch} from 'redux';
import backend from '../../backend/backend';
import {TaskAction, TaskActionTypes} from './types';

export const loadTasks = () => (dispatch: Dispatch<TaskAction>): void => {
    const tasks = backend.getTasks();
    dispatch({
        type: TaskActionTypes.SetTaskList,
        payload: tasks
    });
}