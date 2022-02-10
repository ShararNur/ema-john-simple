import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router';
import { UserContext } from '../../App';

const PrivateRoute = ({ children, redirectTo }) => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    let location = useLocation();
    return loggedInUser.email ? children : <Navigate to={redirectTo} state={{ from: location }} />;
}

export default PrivateRoute;