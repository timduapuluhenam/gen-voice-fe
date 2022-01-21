/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'

// import logo
import Logo from '../assets/img/Logo.png'

// import css module
import style from '../assets/style/navbar.module.css'

import { useCookies } from 'react-cookie'

import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()
  const [cookies, setCookie, removeCookie] = useCookies()
  const [checkCookie, setCheckCookie] = useState(undefined)

  useEffect(() => {
    setCheckCookie(cookies.token)
  }, [])

  const handleLogout = e => {
    e.preventDefault()
    removeCookie('token')
    setCheckCookie(undefined)
  }

  return (
    <div className={`${style.navbar} navbar p-3 navbar-expand-lg navbar-dark bg-dark`}>
      {/* ---- Container Section ---- */}
      <div className='container d-flex justify-content-between'>

        {/* ---- Logo and Brand Section ---- */}
        <div>
          <img src={Logo} alt="logo" width="50" height="50"/>
          <span className={`h-4 ${style.logo}`}>GenVoice</span>
        </div>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon text-white"></span>
        </button>
        {/* Menu Section */}
          <div className='collapse navbar-collapse justify-content-end' id='navbarNav'>
            <ul className={`navbar-nav ${style.navbarItem}`}>
                { checkCookie && <Link className={`${style.a}`} to="/dashboard"><li className="nav-item px-3 my-2">Dashboard</li></Link> }
                <Link className={`${style.a}`} to="/features"><li className="nav-item px-3 my-2">Features</li></Link>
                <Link className={`${style.a}`} to="/help"><li className="nav-item px-3 my-2">Help</li></Link>
                { checkCookie && <a className={`${style.a}`} onClick={handleLogout} href='/#'><li className="nav-item ps-3 my-2">Logout</li></a>}
                { !checkCookie && <Link className={`${style.a}`} to="/login"><li className="nav-item ps-3 my-2">Login</li></Link>}
              </ul>
          </div>
      </div>
    </div>
  )
}

export default Navbar
