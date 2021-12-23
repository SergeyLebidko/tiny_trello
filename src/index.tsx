import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import App from './components/App/App';
import store from './store/store';
import {Provider} from 'react-redux';
import './style/reset.scss';

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
