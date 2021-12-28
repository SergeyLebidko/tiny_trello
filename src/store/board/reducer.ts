import {Board, BoardAction, BoardActionTypes} from './types';

export function boardsReducer(state: Array<Board> = [], action: BoardAction): Array<Board> {
    switch (action.type) {
        case BoardActionTypes.SetBoardList: {
            return action.payload;
        }
        case BoardActionTypes.CreateBoard: {
            return [...state, action.payload];
        }
        case BoardActionTypes.PatchBoard: {
            return state.map(board => board.id === action.payload.id ? action.payload : board);
        }
        case BoardActionTypes.RemoveBoard: {
            return state.filter(board => board.id !== action.payload.id);
        }
        default: {
            return state;
        }
    }
}