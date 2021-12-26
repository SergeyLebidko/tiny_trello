import {Dispatch} from 'redux';
import {BoardActionTypes, SetBoardListAction} from './types';
import backend from '../../backend/backend';

export const loadBoards = () => (dispatch: Dispatch<SetBoardListAction>): void => {
    const boards = backend.getBoards();
    dispatch({
        type: BoardActionTypes.SetBoardList,
        payload: boards
    });
}