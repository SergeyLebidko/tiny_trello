import {createStore, combineReducers, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {userReducer} from './user/reducer';
import {boardsReducer} from './board/reducer';
import {cardsReducer} from './card/reducer';
import {tasksReducer} from './task/reducer';
import {dndReducer} from './dnd/reducer';

//Хитрая конструкция, хз как работает, нужна для useTypedSelector
export type RootState = ReturnType<typeof combinedReducer>

const combinedReducer = combineReducers({
    user: userReducer,
    boards: boardsReducer,
    cards: cardsReducer,
    tasks: tasksReducer,
    dndObject: dndReducer
});

const store = createStore(combinedReducer, {}, composeWithDevTools(applyMiddleware(thunk)));
export default store;