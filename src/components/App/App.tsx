import React from 'react';
import {useSelector} from 'react-redux';
import {Route, Routes} from 'react-router-dom';
import Main from '../pages/Main/Main';
import BoardList from '../pages/BoardList/BoardList';
import Board from '../pages/Board/Board';
import NoMatch from '../pages/NoMatch/NoMatch';
import {User} from '../../store/user/types';
import {RootState} from '../../store/store';
import {getUser} from '../../store/selectors';
import './App.scss';

function App() {
    const user = useSelector<RootState, User | null>(getUser);

    return (
        <Routes>
            <Route path="/tiny_trello" element={<Main/>}/>
            {/* Пути к списку досок и отдельным доскам доступны только для залогинившихся пользователей */}
            {user &&
            <>
                <Route path="/tiny_trello/board_list" element={<BoardList/>}/>
                <Route path="/tiny_trello/board/:id" element={<Board/>}/>
            </>
            }
            <Route path="*" element={<NoMatch/>}/>
        </Routes>
    );
}

export default App;
