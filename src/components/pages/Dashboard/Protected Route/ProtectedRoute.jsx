import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, session,allowedRoles, userRole }) => {
    const location = useLocation();
    const isProfileRoute = location.pathname.includes("profile");

    if (!session) {
        return <Navigate to="/signin" replace />
    }

    if (userRole === undefined) {
        return null; 
    }

    if (!allowedRoles.includes(userRole)) {
        if (!isProfileRoute) {
            return <Navigate to={`${location.pathname}/unauthorized`} replace />;
        }
    }
    return children;

}

export default ProtectedRoute;