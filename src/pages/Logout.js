import Cookies from 'js-cookie'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
  const navigate = useNavigate()

  Cookies.remove('token')
  navigate('/')

  return (
    <div>
    </div>
  )
}

export default Logout
