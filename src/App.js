import React from 'react'
import {
  Routes,
  Route
} from 'react-router-dom'

import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import Reports from './pages/Reports'

function App () {
  return (
    <Routes>
      <Route path="" element={<Home/>}/>
      <Route path="/dashboard/*" element={<Dashboard/>}/>
      <Route path="/reports/*" element={<Reports />}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
    </Routes>
  )
}

export default App
