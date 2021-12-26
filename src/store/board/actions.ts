import {Dispatch} from 'redux';
import {
    Board,
    BoardActionTypes,
    CreateBoardAction,
    PatchBoardAction,
    RemoveBoardAction,
    SetBoardListAction
} from './types';
import backend from '../../backend/backend';

// Редьюсер для загрузки списка досок с "сервера" в хранилище redux
export const loadBoards = () => (dispatch: Dispatch<SetBoardListAction>): void => {
    const boards = backend.getBoards();
    dispatch({
        type: BoardActionTypes.SetBoardList,
        payload: boards
    });
}

// Редьюсер для создания доски
export const createBoard = (board: Board) => (dispatch: Dispatch<CreateBoardAction>): void => {
    const createdBoard = backend.createBoard(board);
    dispatch({
        type: BoardActionTypes.CreateBoard,
        payload: createdBoard
    });
}

// Редьюсер для изменения уже существующей доски
export const patchBoard = (board: Board) => (dispatch: Dispatch<PatchBoardAction>): void => {
    const patchedBoard = backend.patchBoard(board);
    dispatch({
        type: BoardActionTypes.PatchBoard,
        payload: patchedBoard
    })
}

// Редьюсер для удаления доски
export const removeBoard = (board: Board) => (dispatch: Dispatch<RemoveBoardAction>): void => {
    const removedBoard = backend.removeBoard(board);
    dispatch({
        type: BoardActionTypes.RemoveBoard,
        payload: removedBoard
    });
}