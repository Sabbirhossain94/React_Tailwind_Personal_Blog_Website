import { BrowserRouter as Router, Routes, Navigate, Route, useLocation } from "react-router-dom";
import Home from "./Home/Home";
import useSession from "../../hooks/useSession";
import Navigation from "../layout/header/Navigation";
import Content from "./Blog Details/Content";
import SignIn from "./Auth/SignIn";
import SignUp from "./Auth/SignUp";
import ProtectedRoute from "./Dashboard/Protected Route/ProtectedRoute";
import SignedProtectedRoute from "./Auth/SignedProtectedRoute"
import Dashboard from "./Dashboard/Dashboard";
import DashboardMain from "./Dashboard/Main";
import Account from "./Dashboard/Profile/Account";
import CreateBlog from "./Dashboard/Posts/CreateBlog";
import Footer from "../layout/static/Footer";
import Posts from "./Dashboard/Posts";
import Users from "./Dashboard/Users";
import Unauthorized from "./Dashboard/Protected Route/Unauthorized";
import NoPage from "./Error/NoPage";
import { Toaster } from "react-hot-toast";
import { ProfileProvider } from "../../context/ProfileContext";
import { useProfile } from "../../context/ProfileContext";

function AppRouter() {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/dashboard");
  const { userRole } = useProfile();

  return (
    <>
      <Toaster />
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/topics/:topicName" element={<Home />} />
        <Route path="/signin" element={
          <SignedProtectedRoute>
            <SignIn />
          </SignedProtectedRoute>
        } />
        <Route path="/signup" element={<SignedProtectedRoute>
          <SignUp />
        </SignedProtectedRoute>} />
        <Route path="/blog/:id" element={<Content />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["user", "admin"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route
            index
            element={<Navigate to={userRole === "admin" ? "main" : "profile"} replace />}
          />
          <Route
            path="main"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <DashboardMain />
              </ProtectedRoute>
            }
          />
          <Route
            path="posts"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <Posts />
              </ProtectedRoute>
            }
          />
          <Route
            path="profile"
            element={<Account />}
          />
          <Route
            path="createblog"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <CreateBlog />
              </ProtectedRoute>
            }
          />
          <Route
            path="users"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <Users />
              </ProtectedRoute>
            }
          />
          <Route
            path="blog/:id/update"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <CreateBlog />
              </ProtectedRoute>
            }
          />
          <Route path="unauthorized" element={<Unauthorized />} />
        </Route>
        <Route path="*" element={<NoPage />} />
      </Routes>
      {!isDashboard && <Footer />}
    </>
  );
}

export default function Root() {
  const { loading, session, userRole } = useSession();

  return loading ? (
    <div></div>
  ) :
    <ProfileProvider session={session} userRole={userRole}>
      <Router>
        <AppRouter />
      </Router>
    </ProfileProvider>
}