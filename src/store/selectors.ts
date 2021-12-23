import {RootState} from './store';

import {User} from './user/types';

export const getUser = (state: RootState): User | null => state.user;