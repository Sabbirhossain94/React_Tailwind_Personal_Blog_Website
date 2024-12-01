import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import App from "../../App";
import useSession from "../../hooks/useSession";
import Navigation from "../layout/header/Navigation";
import Content from "./Blog Details/Content";
import SignIn from "./Auth/SignIn";
import ProtectedRoute from "./Auth/ProtectedRoute"
import Dashboard from "./Dashboard/Dashboard";
import Account from "./Profiles/Account";
import CreateBlog from "./Profiles/CreateBlog";
import Footer from "../layout/static/Footer";
import Posts from "./Dashboard/Posts";
import Users from "./Dashboard/Users";
import { Toaster } from "react-hot-toast";
import { ProfileProvider } from "../../context/ProfileContext";

function AppRouter() {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/dashboard");

  return (
    <>
      <Toaster />
      <Navigation />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/signin" element={<SignIn />} />
        <Route
          path="/blog/:id"
          element={<Content />}
        />
        <Route path="/dashboard" element={
          <ProtectedRoute >
            <Dashboard />
          </ProtectedRoute>
        }>
          <Route index element={<Navigate to="posts" />} />
          <Route path="posts" element={<Posts />} />
          <Route path="profile" element={<Account />} />
          <Route path="createblog" element={<CreateBlog />} />
          <Route path="users" element={<Users />} />
          <Route path="blog/:id/update" element={<CreateBlog />} />
        </Route>
      </Routes>
      {!isDashboard && <Footer />}
    </>
  );
}

export default function Root() {
  const { loading, session } = useSession();

  return loading ? (
    <div></div>
  ) :
    <ProfileProvider session={session}>
      <Router>
        <AppRouter />
      </Router>
    </ProfileProvider>
}