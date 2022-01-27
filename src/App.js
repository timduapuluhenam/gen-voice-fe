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
import Help from './pages/Help'
import Error from './pages/Error'
import Feature from './pages/Feature'
import Settings from './pages/Settings'
import CheckInvoice from './pages/CheckInvoice'

function App () {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/dashboard/*" element={<Dashboard/>}/>
      <Route path="/reports/*" element={<Reports />}/>
      <Route path="/settings" element={<Settings/>}/>
      <Route path="/features" element={<Feature/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/help" element={<Help/>}/>
      <Route path="/check_invoice" element={<CheckInvoice/>}/>
      <Route path="*" element={<Error/>}/>
    </Routes>
  )
}

export default App
