import React from 'react'

// import logo
import Logo from '../assets/img/Logo.png'

// import css module
import style from '../assets/style/navbar.module.css'

const Navbar = () => {
  return (
    <div className={`${style.navbar} navbar p-3 navbar-expand-md navbar-light bg-dark`}>
      {/* ---- Container Section ---- */}
      <div className='container d-flex justify-content-between'>

        {/* ---- Logo and Brand Section ---- */}
        <div>
          <img src={Logo} alt="logo" width="50" height="50"/>
          <span className={`h-4 ${style.logo}`}>GenVoice</span>
        </div>
        {/* Menu Section */}
          <ul className={`navbar-nav ${style.navbarItem}`}>
            <a className={`${style.a}`} href="/#"><li className="nav-item px-3">Dashboard</li></a>
            <a className={`${style.a}`} href="/#"><li className="nav-item px-3">Check Invoice</li></a>
            <a className={`${style.a}`} href="/#"><li className="nav-item px-3">Features</li></a>
            <a className={`${style.a}`} href="/#"><li className="nav-item px-3">Help</li></a>
            <a className={`${style.a}`} href="/login"><li className="nav-item ps-3">Login</li></a>
          </ul>
      </div>
    </div>
  )
}

export default Navbar
