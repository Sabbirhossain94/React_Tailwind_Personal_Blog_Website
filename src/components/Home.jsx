import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import App from '../App'
import Navigation from './Navigation'
import Content from './pages/Content'
import SignIn from './pages/SignIn'
import supabase from '../supabaseClient'
import Account from './pages/Profiles/Account'

export default function () {

  const [session, setSession] = useState(null);
  useEffect(() => {

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

  }, [])
    return (
        <Router>
            <div>
                <Navigation session={session} />
                <Routes>
                    <Route path="/" element={<App session={session} />} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/content" element={<Content />} />
                    <Route path="/account" element={<Account session={session} />} />

                </Routes>
            </div>
        </Router>
    )
}
