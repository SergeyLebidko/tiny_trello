import {RootState} from './store';
import {TypedUseSelectorHook, useSelector} from 'react-redux';
import {User} from './user/types';
import {Board} from './board/types';
import {Task} from './task/types';
import {Card} from './card/types';

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export const getLoggedUser = (state: RootState): User | null => state.user;
export const getBoards = (state: RootState): Array<Board> => state.boards;
export const getCards = (state: RootState): Array<Card> => state.cards;
export const getTasks = (state: RootState): Array<Task> => state.tasks;

export const getDNDObject = (state: RootState): Card | Task | null => state.dndObject;