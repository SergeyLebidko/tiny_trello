import {RootState} from './store';
import {TypedUseSelectorHook, useSelector} from 'react-redux';
import {User} from './user/types';
import {Board} from './board/types';

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export const getLoggedUser = (state: RootState): User | null => state.user;
export const getBoards = (state: RootState): Array<Board> => state.boards;