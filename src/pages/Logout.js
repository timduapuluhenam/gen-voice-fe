import Cookies from 'js-cookie'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
  const navigate = useNavigate
  if (Cookies.get('token')) {
    Cookies.remove('token')
  }

  return (
    <>
      {navigate('/')}
    </>
  )
}

export default Logout
