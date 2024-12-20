import { Navigate } from "react-router-dom";
import { useProfile } from "../../../../context/ProfileContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { session, loading, userRole } = useProfile();
  
    if (!session) {
        return <Navigate to="/signin" replace />
    }

    if (allowedRoles && !allowedRoles.includes(userRole)) {
        return loading ? <div></div> : <Navigate to="unauthorized" replace />;
    }

    return children;
}

export default ProtectedRoute;