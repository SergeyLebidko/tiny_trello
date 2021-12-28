export type Board = {
    id?: number,
    userId: number,
    title: string
}

export enum BoardActionTypes {
    SetBoardList = 'SET_BOARD_LIST',
    CreateBoard = 'CREATE_BOARD',
    PatchBoard = 'PATCH_BOARD',
    RemoveBoard = 'REMOVE_BOARD'
}

export type SetBoardListAction = {
    type: BoardActionTypes.SetBoardList,
    payload: Array<Board>
}

export type CreateBoardAction = {
    type: BoardActionTypes.CreateBoard,
    payload: Board
}

export type PatchBoardAction = {
    type: BoardActionTypes.PatchBoard,
    payload: Board
}

export type RemoveBoardAction = {
    type: BoardActionTypes.RemoveBoard,
    payload: Board
}

//Объединяем все типы экшенов для простоты вставки
export type BoardAction = SetBoardListAction | CreateBoardAction | PatchBoardAction | RemoveBoardAction;