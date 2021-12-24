import {createStore, combineReducers, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import {User} from './user/types';
import {userReducer} from './user/reducer';

export type RootState = ReturnType<typeof combinedReducer>

const combinedReducer = combineReducers({
    user: userReducer
});

const store = createStore(combinedReducer, {}, composeWithDevTools(applyMiddleware(thunk)));
export default store;