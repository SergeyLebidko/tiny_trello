import React from 'react';
import {useLocation} from 'react-router-dom';
import './NoMatch.scss';

const NoMatch: React.FC = () => {
    const location = useLocation();

    return (
        <div>
            Страница {location.pathname} не найдена...
        </div>
    );
}

export default NoMatch;