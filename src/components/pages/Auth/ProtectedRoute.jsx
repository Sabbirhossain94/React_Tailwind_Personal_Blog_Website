import { Navigate } from "react-router-dom";
import { useSessionContext } from "../../../context/SessionContext";

const ProtectedRoute = ({ children }) => {
    const session = useSessionContext();
    if (!session) {
        alert()
        return <Navigate to="/signin" replace />
    }
    return children;
}

export default ProtectedRoute;