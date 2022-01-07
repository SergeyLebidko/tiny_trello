import React from 'react';
import {useLocation} from 'react-router-dom';
import './NoMatch.scss';

const NoMatch: React.FC = () => {
    const location = useLocation();

    return (
        <div className="noMatch">
            <p className="noMatch__text"><span>Ошибка 404:</span><br/> cтраница <span>{`"https://${location.pathname}"`}</span> не найдена...<hr/></p>
            
        </div>
    );
}

export default NoMatch;