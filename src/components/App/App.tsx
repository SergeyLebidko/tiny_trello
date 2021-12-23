import React from 'react';
import {Provider} from 'react-redux';
import {Route, Routes} from 'react-router-dom';
import Main from '../pages/Main/Main';
import BoardList from '../pages/BoardList/BoardList';
import Board from '../pages/Board/Board';
import NoMatch from '../pages/NoMatch/NoMatch';
import store from '../../store/store';
import './App.scss';

function App() {
    return (
        <Provider store={store}>
            <Routes>
                <Route path="/" element={<Main/>}/>
                <Route path="/board_list" element={<BoardList/>}/>
                <Route path="/board/:id" element={<Board/>}/>
                <Route path="*" element={<NoMatch/>}/>
            </Routes>
        </Provider>
    );
}

export default App;
