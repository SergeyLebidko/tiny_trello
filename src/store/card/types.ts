export type Card = {
    id?: number,
    boardId: number,
    title: string,
    order: number
}

export enum CardActionTypes {
    SetCardList = 'SET_CARD_LIST',
    CreateCard = 'CREATE_CARD',
    PatchCard = 'PATCH_CARD',
    RemoveCard = 'REMOVE_CARD'
}

export type SetCardListAction = {
    type: CardActionTypes.SetCardList,
    payload: Array<Card>
}

export type CreateCardAction = {
    type: CardActionTypes.CreateCard,
    payload: Card
}

export type PatchCardAction = {
    type: CardActionTypes.PatchCard,
    payload: Card
}

export type RemoveCardAction = {
    type: CardActionTypes.RemoveCard,
    payload: Card
}

//Объединяем все типы экшенов для простоты вставки
export type CardAction = SetCardListAction | CreateCardAction | PatchCardAction | RemoveCardAction;