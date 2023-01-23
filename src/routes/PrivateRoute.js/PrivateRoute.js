import React, { useContext } from 'react';
import { AuthContext } from '../../components/Context/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {

    const { loading, user } = useContext(AuthContext);
    const location=useLocation();
    // console.log(location);

    if (loading) {
        return <div>Loading.......</div>
    }
    if (user) {
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} replace />
};

export default PrivateRoute;