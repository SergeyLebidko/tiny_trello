import {createStore, combineReducers, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {userReducer} from './user/reducer';

//Хитрая конструкция, хз как работает, нужна для useTypedSelector
export type RootState = ReturnType<typeof combinedReducer>

const combinedReducer = combineReducers({
    user: userReducer
});

const store = createStore(combinedReducer, {}, composeWithDevTools(applyMiddleware(thunk)));
export default store;