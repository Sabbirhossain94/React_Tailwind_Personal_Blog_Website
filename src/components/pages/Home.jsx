import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "../../App";
import useSession from "../../hooks/useSession";
import Navigation from "../layout/header/Navigation";
import Content from "./Blog Details/Content";
import Auth from "./Auth/SignIn";
import Dashboard from "./Dashboard/Dashboard";
import Account from "./Profiles/Account";
import CreateBlog from "./Profiles/CreateBlog";
import Footer from "../layout/static/Footer";
import Posts from "./Dashboard/Posts";
import Users from "./Dashboard/Users";
import Profile from "./Dashboard/Profile";
import { Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

 function AppRouter () {
  const { session } = useSession()
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/dashboard");

  return (
    <>
      <Navigation session={session} />
      <Routes>
        <Route path="/" element={<App session={session} />} />
        <Route path="/signin" element={<Auth />} />
        <Route
          path="/blog/:id"
          element={<Content session={session} />}
        />
        <Route path="/account" element={<Account session={session} />} />
        <Route path="/dashboard" element={<Dashboard session={session} />}>
          <Route index element={<Navigate to="posts" />} />
          <Route path="posts" element={<Posts session={session} />} />
          <Route path="createblog" element={<CreateBlog session={session} />} />
          <Route path="profile" element={<Profile session={session} />} />
          <Route path="users" element={<Users session={session} />} />
          <Route path="blog/:id/update" element={<CreateBlog session={session} />} />
        </Route>
      </Routes>
      {!isDashboard && <Footer />}
    </>
  );
}

export default function Root({ session }) {
  return (
    <Router>
      <AppRouter session={session} />
    </Router>
  );
}