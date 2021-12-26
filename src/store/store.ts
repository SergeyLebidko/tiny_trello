import {createStore, combineReducers, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {userReducer} from './user/reducer';
import {boardsReducer} from './board/reducer';

//Хитрая конструкция, хз как работает, нужна для useTypedSelector
export type RootState = ReturnType<typeof combinedReducer>

const combinedReducer = combineReducers({
    user: userReducer,
    boards: boardsReducer
});

const store = createStore(combinedReducer, {}, composeWithDevTools(applyMiddleware(thunk)));
export default store;