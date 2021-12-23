import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Main from '../pages/Main/Main';
import './App.scss';

function App() {
    return (
        <div>
            <h1>Tiny Trello</h1>
            <Routes>
                <Route path="/" element={<Main/>}/>
            </Routes>
        </div>
    );
}

export default App;
