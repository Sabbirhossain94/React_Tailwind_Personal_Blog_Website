import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "../App";
import Navigation from "./Navigation";
import Content from "./pages/Content";
import SignIn from "./pages/SignIn";
import supabase from "../supabaseClient";
import Account from "./pages/Profiles/Account";
import CreateBlog from "./pages/Profiles/CreateBlog";
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
          <Route exact path="/" element={<App session={session} />} />
          <Route path="/signin" element={<SignIn />} />
          <Route
            path="/content/:id"
            element={<Content session={session} />}
          />
          <Route path="/account" element={<Account session={session} />} />
          <Route
            exact
            path="/createblog"
            element={<CreateBlog session={session} />}
          />
          <Route
            path="/blog/:id/update"
            element={<CreateBlog session={session} />}
          />
        </Routes>
      </Router>
    </Context.Provider>
  );
}
