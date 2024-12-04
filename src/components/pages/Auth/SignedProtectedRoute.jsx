import { Navigate } from "react-router-dom";
import { useProfile } from "../../../context/ProfileContext";

const SignedProtectedRoute = ({ children }) => {
    const { session } = useProfile();
    if (session) {
        return <Navigate to="/" replace />
    }
    return children;
}

export default SignedProtectedRoute;