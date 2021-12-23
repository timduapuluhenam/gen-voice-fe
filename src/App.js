import React from 'react'
import {
  Routes,
  Route
} from 'react-router-dom'

import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Logout from './pages/Logout'
import Register from './pages/Register'

function App () {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/logout" element={<Logout/>}/>
    </Routes>
  )
}

export default App
