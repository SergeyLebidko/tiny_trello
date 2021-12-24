import React from 'react';
import {useSelector} from 'react-redux';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Main from '../pages/Main/Main';
import BoardList from '../pages/BoardList/BoardList';
import Board from '../pages/Board/Board';
import NoMatch from '../pages/NoMatch/NoMatch';
import {ROUTE_PREFIX} from '../../constants/settings';
import './App.scss';
import {useTypedSelector} from "../../store/selectors";

function App() {
    const {users, loggedUser} = useTypedSelector(state => state.user)

    return (
        <BrowserRouter>
            <Routes>
                <Route path={`/${ROUTE_PREFIX}`} element={<Main/>}/>
                {/* Пути к списку досок и отдельным доскам доступны только для залогинившихся пользователей */}
                { (localStorage.getItem('activeUser') === '1') &&
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
