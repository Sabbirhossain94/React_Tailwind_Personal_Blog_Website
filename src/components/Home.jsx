import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import App from '../App'
import Navigation from './Navigation'
import Content from './pages/Content'
import SignIn from './pages/SignIn'
import supabase from '../supabaseClient'
import Account from './pages/Profiles/Account'
import CreateBlog from './pages/Profiles/CreateBlog'

export default function () {

  const [session, setSession] = useState(null);

  useEffect(() => {

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      console.log(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      console.log(session)
    })
    supabase.auth.onAuthStateChange((event, session) => {
      if (event == 'SIGNED_IN'){
        setSession(session)
        console.log(session)
      }
    })

  }, [])
    return (
        <Router>
            <div>
                <Navigation session={session} />
                <Routes>
                    <Route path="/" element={<App session={session} />} />
                    <Route path="/:id" element={<App session={session} />} />
                    <Route path="/signin" element={<SignIn  />} />
                    <Route path="/content/:id" element={<Content />} />
                    <Route path="/account" element={<Account session={session} />} />
                    <Route path="/createblog" element={<CreateBlog session={session} />} />
                    <Route path="/blog/:id/update" element={<CreateBlog session={session} />} />
                    
                </Routes>
            </div>
        </Router>
    )
}
