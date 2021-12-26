import React, {useEffect, useState} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Main from '../pages/Main/Main';
import BoardList from '../pages/BoardList/BoardList';
import Board from '../pages/Board/Board';
import NoMatch from '../pages/NoMatch/NoMatch';
import {ROUTE_PREFIX} from '../../constants/settings';
import {getLoggedUser, useTypedSelector} from '../../store/selectors';
import {DataKeys} from '../../backend/backend';
import {User, UserActionTypes} from '../../store/user/types';
import {useDispatch} from 'react-redux';
import {loadBoards} from '../../store/board/actions';
import './App.scss';


function App() {
    const dispatch = useDispatch();
    const [hasUserChecked, setHasUserChecked] = useState<boolean>(false);
    const loggedUser = useTypedSelector(getLoggedUser);

    // При монтировании приложения сразу же пытаемся извлечь данные о залогинившемся пользователе из localStorage
    // Если они там есть - тут же записываем их в redux и таким образом делаем доступным черех хуки редакса всему приложению
    useEffect(() => {
        const loggedUserData = localStorage.getItem(DataKeys.LoggedUser);

        // Если пользователь залогинен - загружаем из БД все ассоцированные с ним данные
        if (loggedUserData) {

            // Прописываем данные пользователя в redux
            const user: User = JSON.parse(loggedUserData);
            dispatch({
                type: UserActionTypes.SetUser,
                payload: user
            });

            // Загружаем доски пользователя
            dispatch(loadBoards());
        }
        setHasUserChecked(true);
    }, [dispatch, setHasUserChecked]);

    // Пока не выполнена проверка пользователя, выводим сообщение о загрузке - прелоадер
    if(!hasUserChecked) return <div>Пожалуйста подождите...</div>;

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
