import {Dispatch} from 'redux';
import backend from '../../backend/backend';
import {Task, TaskAction, TaskActionTypes} from './types';

export const loadTasks = () => (dispatch: Dispatch<TaskAction>): void => {
    const tasks = backend.getTasks();
    dispatch({
        type: TaskActionTypes.SetTaskList,
        payload: tasks
    });
}

export const createTask = (task: Task) => (dispatch: Dispatch<TaskAction>): void => {
    const createdTask = backend.createTask(task);
    dispatch({
        type: TaskActionTypes.CreateTask,
        payload: createdTask
    });
}

export const patchTask = (task: Task) => (dispatch: Dispatch<TaskAction>): void => {
    const patchedTask = backend.patchTask(task);
    dispatch({
        type: TaskActionTypes.PatchTask,
        payload: patchedTask
    })
}

export const removeTask = (task: Task) => (dispatch: Dispatch<TaskAction>): void => {
    const removedTask = backend.removeTask(task);
    dispatch({
        type: TaskActionTypes.RemoveTask,
        payload: removedTask
    });
}

export const removeTasksFromRedux = () => (dispatch: Dispatch<TaskAction>): void => {
    dispatch({
        type: TaskActionTypes.SetTaskList,
        payload: []
    })
}