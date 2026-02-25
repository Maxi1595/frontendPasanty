// import { Navigate, Outlet } from 'react-router-dom';

// const ProtectedRoute = () => {
//     const isToken = localStorage.getItem("token");

//     return isToken ? <Outlet /> : <Navigate to="/login" />
// };

// export default ProtectedRoute;  

import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '@emotion/react';

const ProtectedRoute = ({ allowedRoles }) => {
    const { user, isAuthenticated } = useAuth();

    const allowed = allowedRoles.map(Number);
    // console.log(allowedRoles);
    // console.log(JSON.stringify(localStorage.getItem("user")));
    // console.log(user);
    // console.log(isAuthenticated)

    // JSON.parse(localStorage.getItem("user"))
    // localStorage.getItem("token")

    if (user === null) return <div>Cargando...</div>

    if (!isAuthenticated || isAuthenticated === false) {
        return <Navigate to="/login" />;
    }

    if (allowed && !allowed.includes(user.rol)) {
        // Si el usuario tiene sesión pero no tiene el rol correcto
        return <Navigate to="/" />; // redirige al home
    }

    return <Outlet />;
};

export default ProtectedRoute;