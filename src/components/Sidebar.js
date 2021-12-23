import React from 'react'
import { Link } from 'react-router-dom'

import Logo from '../assets/img/Logo.png'

import style from '../assets/style/sidebar.module.css'

import { MdDashboard, MdSettings, MdHelpOutline, MdLogout } from 'react-icons/md'
import { HiDocumentReport, HiOutlineClock } from 'react-icons/hi'

const Sidebar = () => {
  return (
    <div className='d-flex flex-column flex-shrink-0 p-0' style={{ width: '280px', height: '100vh', background: '#0D1A33' }}>
      <Link to="/" style={{ textDecoration: 'none', background: '#0D1A33', height: '12vh' }} className='d-flex justify-content-center'>
        <div style={{ margin: 'auto' }}>
          <img src={Logo} width="56.25" height="50" />
          <span className={style.logo}>GenVoice</span>
        </div>
      </Link>
      <div className='h-25 m-0 fs-4 text-white d-flex justify-content-center' style={{ background: '#1F3A57' }}>
        <div style={{ margin: 'auto' }}>Organization Name</div>
      </div>
      <ul className='nav nav-pills flex-column mb-auto' style={{ background: '#1F3A57' }}>
        <li className={`nav-item ${style.active}`}>
          <a href='/#' className='nav-link text-white'>
          <MdDashboard className='align-middle'/>
          <span className='align-middle ms-1'>Dashboard</span>
          </a>
        </li>
        <li className='nav-item'>
          <a href='/#' className='nav-link text-white'>
          <HiDocumentReport className='align-middle'/>
          <span className='align-middle ms-1'>Report</span>
          </a>
        </li>
        <li className='nav-item'>
          <a href='/#' className='nav-link text-white'>
          <HiOutlineClock className='align-middle'/>
          <span className='align-middle ms-1'>Tracks</span>
          </a>
        </li>
        <li className='nav-item'>
          <a href='/#' className='nav-link text-white'>
          <MdSettings className='align-middle'/>
          <span className='align-middle ms-1'>Settings</span>
          </a>
        </li>
        <li className='nav-item'>
          <a href='/#' className='nav-link text-white'>
          <MdHelpOutline className='align-middle'/>
          <span className='align-middle ms-1'>Help</span>
          </a>
        </li>
        <li className='nav-item'>
          <a href='/logout' className='nav-link text-white'>
          <MdLogout className='align-middle'/>
          <span className='align-middle ms-1'>Logout</span>
          </a>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar
