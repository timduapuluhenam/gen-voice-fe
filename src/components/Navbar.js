import React, { useState, useEffect } from 'react'

// import logo
import Logo from '../assets/img/Logo.png'

// import css module
import style from '../assets/style/navbar.module.css'

import Cookies from 'js-cookie'

import { Link } from 'react-router-dom'
const Navbar = () => {
  const [checkCookie, setCheckCookie] = useState(undefined)

  useEffect(() => {
    setCheckCookie(Cookies.get('token'))
  }, [])
  return (
    <div className={`${style.navbar} navbar p-3 navbar-expand-lg navbar-light bg-dark`}>
      {/* ---- Container Section ---- */}
      <div className='container d-flex justify-content-between'>

        {/* ---- Logo and Brand Section ---- */}
        <div>
          <img src={Logo} alt="logo" width="50" height="50"/>
          <span className={`h-4 ${style.logo}`}>GenVoice</span>
        </div>
        {/* Menu Section */}
          <ul className={`navbar-nav ${style.navbarItem}`}>
            { checkCookie && <Link className={`${style.a}`} to="/dashboard"><li className="nav-item px-3">Dashboard</li></Link> }
            <Link className={`${style.a}`} to="/#"><li className="nav-item px-3">Check Invoice</li></Link>
            <Link className={`${style.a}`} to="/#"><li className="nav-item px-3">Features</li></Link>
            <Link className={`${style.a}`} to="/#"><li className="nav-item px-3">Help</li></Link>
            { checkCookie && <Link className={`${style.a}`} to="/logout"><li className="nav-item ps-3">Logout</li></Link>}
            { !checkCookie && <Link className={`${style.a}`} to="/login"><li className="nav-item ps-3">Login</li></Link>}
          </ul>
      </div>
    </div>
  )
}

export default Navbar
