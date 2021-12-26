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
import {loadCards} from '../../store/card/actions';
import {loadTasks} from '../../store/task/actions';
import './App.scss';

import {BoardActionTypes} from '../../store/board/types';
import {CardActionTypes} from '../../store/card/types';
import {TaskActionTypes} from '../../store/task/types';
import {setUser} from "../../store/user/actions";

function App() {
    const dispatch = useDispatch();
    const [hasUserChecked, setHasUserChecked] = useState<boolean>(false);
    const [hasDataLoad, setHasDataLoad] = useState<boolean>(false);
    const loggedUser = useTypedSelector(getLoggedUser);

    // При монтировании приложения сразу же пытаемся извлечь данные о залогинившемся пользователе из localStorage
    useEffect(() => {
        const loggedUserData = localStorage.getItem(DataKeys.LoggedUser);
        if (loggedUserData) {

            // Прописываем данные пользователя в redux
            const user: User = JSON.parse(loggedUserData);
            dispatch(setUser(user));
        }
        setHasUserChecked(true);
    }, [dispatch]);

    // Если пользователь залогинился - сразу же подгружаем из "бэкенда" в redux все ассоцированные с ним данные
    // Если разлогинился - удаляем его данные из хранилища
    useEffect(() => {
        if (loggedUser) {
            // Загружаем доски пользователя
            dispatch(loadBoards());

            // Загружаем карточки пользователя
            dispatch(loadCards());

            // Загружаем задачи пользователя
            dispatch(loadTasks());
        } else {
            //TODO Создать для нижележащих операций отдельные экшены

            // Удаляем из redux доски
            dispatch({
                type: BoardActionTypes.SetBoardList,
                payload: []
            });

            // Удаляем из redux карточки
            dispatch({
                type: CardActionTypes.SetCardList,
                payload: []
            });

            // Удаляем из redux задачи
            dispatch({
                type: TaskActionTypes.SetTaskList,
                payload: []
            });
        }
        setHasDataLoad(true);
    }, [loggedUser, dispatch, setHasUserChecked]);

    // Пока не выполнена проверка пользователя, выводим сообщение о загрузке - прелоадер
    if (!hasUserChecked || !hasDataLoad) return <div>Пожалуйста подождите...</div>;

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
