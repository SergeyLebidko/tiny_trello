import {createStore, combineReducers, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import {User} from './user/types';
import {userReducer} from './user/reducer';

type RootState = {
    user: User | null
}

const combinedReducer = combineReducers<RootState>({
    user: userReducer
});

const store = createStore(combinedReducer, {}, composeWithDevTools(applyMiddleware(thunk)));
export default store;