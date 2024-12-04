import { Navigate } from "react-router-dom";
import { useProfile } from "../../../context/ProfileContext";

const ProtectedRoute = ({ children }) => {
    const { session } = useProfile();
    if (!session) {
        return <Navigate to="/signin" replace />
    }
    return children;
}

export default ProtectedRoute;