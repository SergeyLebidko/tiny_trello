import React from 'react';
import {useLocation} from 'react-router-dom';
import './NoMatch.scss';

const NoMatch: React.FC = () => {
    const location = useLocation();

    return (
        <div className="noMatch">
            <p className="noMatch_text">
                <span>Ошибка 404:</span>
                <span>cтраница {`"https://${location.pathname}"`} не найдена...</span>
            </p>
        </div>
    );
}

export default NoMatch;