import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Main from '../pages/Main/Main';
import BoardList from '../pages/BoardList/BoardList';
import Board from '../pages/Board/Board';
import NoMatch from '../pages/NoMatch/NoMatch';
import './App.scss';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Main/>}/>
            <Route path="/board_list" element={<BoardList/>}/>
            <Route path="/board/:id" element={<Board/>}/>
            <Route path="*" element={<NoMatch/>}/>
        </Routes>
    );
}

export default App;
