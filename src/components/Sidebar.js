import React from 'react'
import { Link } from 'react-router-dom'

import Logo from '../assets/img/Logo.png'

const Sidebar = () => {
  return (
    <div className='d-flex flex-column flex-shrink-0 p-3 bg-dark' style={{ width: '280px' }}>
      <Link to="/">
        <img src={Logo} width="56.25" height="50"/>
        <span></span>
      </Link>
    </div>
  )
}

export default Sidebar
