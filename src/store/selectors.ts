import {RootState} from './store';
import {TypedUseSelectorHook, useSelector} from "react-redux";
import {User} from './user/types';

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
// export const getUser = (state: RootState): User | null => state.user;

export const getUserIndex = (users: User[], id: number): number => {
    return users.findIndex(user => user.id === id)
}

