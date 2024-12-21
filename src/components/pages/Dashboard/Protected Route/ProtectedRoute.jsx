import { Navigate, useLocation } from "react-router-dom";
import { useProfile } from "../../../../context/ProfileContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { session, userRole } = useProfile();
    const location = useLocation();
    const isProfileRoute = location.pathname.includes("profile");
  
    if (!session) {
        return <Navigate to="/signin" replace />
    }

    if (allowedRoles && !allowedRoles.includes(userRole)) {
        if (!isProfileRoute) {
            return <Navigate to="unauthorized" replace />;
        }
    }
    return children;

}

export default ProtectedRoute;