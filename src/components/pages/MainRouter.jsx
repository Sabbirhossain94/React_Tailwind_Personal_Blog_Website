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
import Comments from "./Dashboard/Comments";
import Unauthorized from "./Dashboard/Protected Route/Unauthorized";
import NoPage from "./Error/NoPage";
import { Toaster } from "react-hot-toast";
import { ProfileProvider } from "../../context/ProfileContext";
import { useProfile } from "../../context/ProfileContext";

function AppRouter() {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/dashboard");
  const { session, userRole } = useProfile();

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
            <ProtectedRoute allowedRoles={["user", "admin"]} session={session} userRole={userRole}>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route
            index
            element={
              userRole ? (
                <Navigate to={userRole === "admin" ? "main" : "profile"} replace />
              ) : null
            }
          />
          <Route
            path="main"
            element={
              <ProtectedRoute allowedRoles={["admin"]} session={session} userRole={userRole}>
                <DashboardMain />
              </ProtectedRoute>
            }
          />
          <Route
            path="profile"
            element={
              <ProtectedRoute allowedRoles={["user", "admin"]} session={session} userRole={userRole}>
                <Account />
              </ProtectedRoute>
            }
          />
          <Route
            path="users"
            element={
              <ProtectedRoute allowedRoles={["admin"]} session={session} userRole={userRole}>
                <Users />
              </ProtectedRoute>
            }
          />
          <Route
            path="comments"
            element={
              <ProtectedRoute allowedRoles={["admin"]} session={session} userRole={userRole}>
                <Comments />
              </ProtectedRoute>
            }
          />
          <Route
            path="posts"
            element={
              <ProtectedRoute allowedRoles={["admin"]} session={session} userRole={userRole}>
                <Posts />
              </ProtectedRoute>
            }
          />
          <Route
            path="createblog"
            element={
              <ProtectedRoute allowedRoles={["admin"]} session={session} userRole={userRole}>
                <CreateBlog />
              </ProtectedRoute>
            }
          />

          <Route
            path="blog/:id/update"
            element={
              <ProtectedRoute allowedRoles={["admin"]} session={session} userRole={userRole}>
                <CreateBlog />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
      {!isDashboard && <Footer />}
    </>
  );
}

export default function Root() {
  const { loading, session, userRole } = useSession();

  if (loading) {
    return <div></div>;
  }

  return (
    <ProfileProvider session={session} userRole={userRole}>
      <Router>
        <AppRouter />
      </Router>
    </ProfileProvider>
  )
}