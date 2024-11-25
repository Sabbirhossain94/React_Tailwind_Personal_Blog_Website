import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "../App";
import useSession from "../hooks/useSession";
import Navigation from "./Navigation";
import Content from "./pages/Content";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard/Dashboard";
import Account from "./pages/Profiles/Account";
import CreateBlog from "./pages/Profiles/CreateBlog";
import Footer from "./Footer";
import Posts from "./pages/Dashboard/Posts";
import Users from "./pages/Dashboard/Users";
import Profile from "./pages/Dashboard/Profile";
import { Navigate } from "react-router-dom";

export default function () {
  const { session } = useSession()

  return (
    <Router>
      <Navigation session={session} />
      <Routes>
        <Route path="/" element={<App session={session} />} />
        <Route path="/signin" element={<SignIn />} />
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
      <Footer />
    </Router>
  );
}
