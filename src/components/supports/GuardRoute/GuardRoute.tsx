import React from 'react';
import {getLoggedUser, useTypedSelector} from '../../../store/selectors';
import {Navigate} from 'react-router-dom';

const GuardRoute: React.FC<{children: JSX.Element}> = ({children}) => {
    const loggedUser = useTypedSelector(getLoggedUser);
    if (!loggedUser) return <Navigate to="/"/>

    return children;
}

export default GuardRoute;