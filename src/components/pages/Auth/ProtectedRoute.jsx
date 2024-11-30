import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ session, children }) => {
    if (!session) {
        return <Navigate to="/signin" replace />
    }
    return children;
}

export default ProtectedRoute;