import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "../App";
import Navigation from "./Navigation";
import Content from "./pages/Content";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard/Dashboard";
import supabase from "../supabaseClient";
import Account from "./pages/Profiles/Account";
import CreateBlog from "./pages/Profiles/CreateBlog";
import Footer from "./Footer";
import Posts from "./pages/Dashboard/Posts";
import { Context } from "../context";

export default function () {
  const [session, setSession] = useState(null);
  const [dark, setDark] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <Context.Provider value={{ theme: [dark, setDark] }}>
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
            <Route index element={<Posts session={session} />} />
            <Route path="createblog" element={<CreateBlog session={session} />} />
          </Route>
          <Route
            path="/blog/:id/update"
            element={<CreateBlog session={session} />}
          />
        </Routes>
        <Footer/>
      </Router>
    </Context.Provider>
  );
}
