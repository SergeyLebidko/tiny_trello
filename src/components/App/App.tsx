import React, {useEffect} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Main from '../pages/Main/Main';
import BoardList from '../pages/BoardList/BoardList';
import Board from '../pages/Board/Board';
import NoMatch from '../pages/NoMatch/NoMatch';
import {ROUTE_PREFIX} from '../../constants/settings';
import {useTypedSelector} from '../../store/selectors';
import {DataKeys} from '../../backend/backend';
import {User, UserActionTypes} from '../../store/user/types';
import {useDispatch} from 'react-redux';
import './App.scss';

function App() {
    const dispatch = useDispatch();
    const loggedUser = useTypedSelector(state => state.user);

    // При монтировании приложения сразу же пытаемся извлечь данные о залогинившемся пользователе из localStorage
    // Если они там есть - тут же записываем их в redux и таким образом делаем доступным черех хуки редакса всему приложению
    useEffect(() => {
        const loggedUserData = localStorage.getItem(DataKeys.LoggedUser);
        if (!loggedUserData) return;
        const user: User = JSON.parse(loggedUserData);
        dispatch({
            type: UserActionTypes.SetUser,
            payload: user
        });
    }, [dispatch]);

    return (
        <BrowserRouter>
            <Routes>
                <Route path={`/${ROUTE_PREFIX}`} element={<Main/>}/>
                {/* Пути к списку досок и отдельным доскам доступны только для залогинившихся пользователей */}
                {loggedUser &&
                <>
                    <Route path={`/${ROUTE_PREFIX}/board_list`} element={<BoardList/>}/>
                    <Route path={`/${ROUTE_PREFIX}/board/:boardId`} element={<Board/>}/>
                </>
                }
                <Route path="*" element={<NoMatch/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
