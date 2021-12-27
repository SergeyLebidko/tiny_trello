import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import store from './store/store';
import {Provider} from 'react-redux';
import './backend/backend';
import './style/reset.scss';

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);
