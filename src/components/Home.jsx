import React, { useRef } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import App from '../App'
import Navigation from './Navigation'
import Content from './pages/Content'
import SignIn from './pages/SignIn'
export default function () {
    
    return (
        <Router>
            <div>
                <Navigation />
                <Routes>
                    <Route path="/" element={<App />} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/content" element={<Content />} />

                </Routes>
            </div>
        </Router>
    )
}
