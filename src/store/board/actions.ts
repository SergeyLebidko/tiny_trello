import {Dispatch} from 'redux';
import {Board, BoardAction, BoardActionTypes} from './types';
import backend from '../../backend/backend';

export const loadBoards = () => (dispatch: Dispatch<BoardAction>): void => {
    const boards = backend.getBoards();
    dispatch({
        type: BoardActionTypes.SetBoardList,
        payload: boards
    });
}

// Функция-экшн для создания доски. На вход принимается объект типа Board, но без проставленного поля id
// Поле id будет проставляться "бэкендом"
export const createBoard = (board: Board) => (dispatch: Dispatch<BoardAction>): void => {
    const createdBoard = backend.createBoard(board);
    dispatch({
        type: BoardActionTypes.CreateBoard,
        payload: createdBoard
    });
}

// Редьюсер для изменения уже существующей доски
export const patchBoard = (board: Board) => (dispatch: Dispatch<BoardAction>): void => {
    const patchedBoard = backend.patchBoard(board);
    dispatch({
        type: BoardActionTypes.PatchBoard,
        payload: patchedBoard
    })
}

// Редьюсер для удаления доски
export const removeBoard = (board: Board) => (dispatch: Dispatch<BoardAction>): void => {
    const removedBoard = backend.removeBoard(board);
    dispatch({
        type: BoardActionTypes.RemoveBoard,
        payload: removedBoard
    });
}

// Редьюсер для удаления списка досок из хранилища
export const removeBoardsFromRedux = () => (dispatch: Dispatch<BoardAction>): void => {
    dispatch({
        type: BoardActionTypes.SetBoardList,
        payload: []
    });
}