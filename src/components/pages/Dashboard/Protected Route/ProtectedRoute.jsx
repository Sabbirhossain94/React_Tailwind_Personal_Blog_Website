import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles, session, userRole }) => {
    const location = useLocation();
    const isProfileRoute = location.pathname.includes("profile");
    
    if (!session) {
        return <Navigate to="/signin" replace />
    }

    if (userRole === undefined || userRole === null) {
        return null;
    }

    if (allowedRoles.includes(userRole)) {
        if (isProfileRoute) {
            return children;
        }

        return children;
    }

    return <Navigate to="/unauthorized" replace />;

}

export default ProtectedRoute;