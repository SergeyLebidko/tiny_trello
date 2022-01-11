import React, {useEffect, useState} from 'react';
import {HashRouter, Route, Routes} from 'react-router-dom';
import Main from '../pages/Main/Main';
import BoardList from '../pages/BoardList/BoardList';
import BoardPanel from '../pages/BoardPanel/BoardPanel';
import NoMatch from '../pages/NoMatch/NoMatch';
import {getLoggedUser, useTypedSelector} from '../../store/selectors';
import {DataKeys} from '../../backend/backend';
import {User} from '../../store/user/types';
import {useDispatch} from 'react-redux';
import {loadBoards, removeBoardsFromRedux} from '../../store/board/actions';
import {loadCards, removeCardsFromRedux} from '../../store/card/actions';
import {loadTasks, removeTasksFromRedux} from '../../store/task/actions';
import {setUser} from '../../store/user/actions';

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
    }, [dispatch, setHasUserChecked]);

    // Если пользователь залогинился - сразу же подгружаем из "бэкенда" в redux все ассоцированные с ним данные
    // Если разлогинился - удаляем его данные из хранилища
    useEffect(() => {
        setHasDataLoad(false);
        if (loggedUser) {
            dispatch(loadBoards());
            dispatch(loadCards());
            dispatch(loadTasks());
        } else {
            dispatch(removeBoardsFromRedux());
            dispatch(removeCardsFromRedux());
            dispatch(removeTasksFromRedux());
        }
        setHasDataLoad(true);
    }, [loggedUser, dispatch, setHasDataLoad]);

    // Пока не выполнена проверка пользователя и загрузка его данных, выводим сообщение о загрузке - прелоадер
    if (!hasUserChecked || !hasDataLoad) return <div>Пожалуйста подождите...</div>;

    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<Main/>}/>
                {/* Пути к списку досок и отдельным доскам доступны только для залогинившихся пользователей */}
                {loggedUser &&
                <>
                    <Route path="/board_list" element={<BoardList/>}/>
                    <Route path="/board/:boardId" element={<BoardPanel/>}/>
                </>
                }
                <Route path="*" element={<NoMatch/>}/>
            </Routes>
        </HashRouter>
    );
}

export default App;
