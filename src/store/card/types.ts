export type Card = {
    id?: number,
    boardId: number,
    title: string,
    order: number
}

export enum CardActionTypes {
    SetCardList = 'SET_CARD_LIST'
}

export type SetCardListAction = {
    type: CardActionTypes.SetCardList,
    payload: Array<Card>
}

//TODO Дополнить перечень экшенами для выполнения операций удаления, создания, правки и т.д...

//Объединяем все типы экшенов для простоты вставки
export type CardAction = SetCardListAction;
