/* eslint-disable no-unused-vars */
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

import Logo from '../assets/img/Logo.png'

import style from '../assets/style/sidebar.module.css'

import { MdDashboard, MdSettings, MdHelpOutline, MdLogout } from 'react-icons/md'
import { HiDocumentReport } from 'react-icons/hi'
import { useCookies } from 'react-cookie'
import { useSelector } from 'react-redux'

const Sidebar = () => {
  const [cookies, setCookie, removeCookie] = useCookies()
  const navigate = useNavigate()
  const page = useSelector(state => state.page)

  const handleLogout = e => {
    e.preventDefault()
    removeCookie('token')
    navigate('/')
  }

  return (
    <div className={` ${style.container} d-flex flex-column flex-shrink-0 p-0`}>
      <Link to="/" style={{ textDecoration: 'none', background: '#0D1A33', height: '12vh' }} className='d-flex justify-content-center'>
        <div style={{ margin: 'auto' }}>
          <img src={Logo} width="56.25" height="50" />
          <span className={style.logoText}>GenVoice</span>
        </div>
      </Link>
      <div className={`h-25 p-3 text-center m-0 fs-4 text-white d-flex justify-content-center ${style.orgSection}`} style={{ background: '#1F3A57' }}>
        <div className={style.orgName}>{cookies.name}</div>
      </div>
      <ul className='nav nav-pills flex-column mb-auto' style={{ background: '#1F3A57' }}>
        <li className={`nav-item ${style.sidebarResponsive} ${page === 'Dashboard' && style.active} p-1`}>
          <Link to='/dashboard' className='nav-link text-white' data-tip data-for='dashboard'>
          <MdDashboard className='align-middle'/>
          <span className={`align-middle ms-1 ${style.sidebarText}`}>Dashboard</span>
          </Link>
        </li>
        <li className={`nav-item p-1 ${style.sidebarResponsive} ${page === 'Reports' && style.active}`}>
          <Link to='/reports' className='nav-link text-white'>
          <HiDocumentReport className='align-middle'/>
          <span className={`align-middle ms-1 ${style.sidebarText}`}>Reports</span>
          </Link>
        </li>
        <li className={`nav-item p-1 ${style.sidebarResponsive} ${page === 'Settings' && style.active}`}>
          <Link to='/settings' className='nav-link text-white'>
          <MdSettings className='align-middle'/>
          <span className={`align-middle ms-1 ${style.sidebarText}`}>Settings</span>
          </Link>
        </li>
        <li className={`nav-item p-1 ${style.sidebarResponsive} ${page === 'Help' && style.active}`}>
          <Link to='/help' className='nav-link text-white'>
          <MdHelpOutline className='align-middle'/>
          <span className={`align-middle ms-1 ${style.sidebarText}`}>Help</span>
          </Link>
        </li>
        <li className={`nav-item p-1 ${style.sidebarResponsive} ${page === 'Logout' && style.active}`}>
          <a href='/#' onClick={handleLogout} className='nav-link text-white'>
          <MdLogout className='align-middle'/>
          <span className={`align-middle ms-1 ${style.sidebarText}`}>Logout</span>
          </a>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar
