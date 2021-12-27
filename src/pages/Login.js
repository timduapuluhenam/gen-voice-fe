/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import style from '../assets/style/loginRegister.module.css'
import { Navigate, useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'

import loginService from '../services/login'

import Spinner from '../components/Spinner'

const Login = () => {
  const navigate = useNavigate()

  const [cookies, setCookie, removeCookie] = useCookies()

  const [data, setData] = useState({
    username: '',
    password: ''
  })

  const [loadingState, setLoadingState] = useState(false)

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('token')
    if (loggedUser) {
      return <Navigate replace to="/"/>
    }
  })

  const handleLogin = async e => {
    e.preventDefault()
    setLoadingState(true)
    try {
      const response = await loginService(data)
      setCookie('token', response.data.token, { path: '/', maxAge: 3600 })
      navigate('/')
    } catch (e) {
      alert(e)
    }
  }
  return (
    <div className={`container-fluid ${style.login} d-flex justify-content-center`}>
      <div className={style.container}>
        <div className={`fw-bold text-center my-3 ${style.logo}`}>GenVoice</div>
        <form className='form form-control p-4 needs-valdiation' style={{ background: '#DAE1E7' }} onSubmit={handleLogin}>
          <h4 className='fw-light text-center'>Log in to your account</h4>
          <label htmlFor='email' className='mt-2'>Username</label><br/>
          <input className={style.inputText} placeholder='Username' type='text' value={data.username} onChange={e => setData({ ...data, username: e.target.value })} required/>
          <label htmlFor='password' className='mt-2'>Password</label><br/>
          <input className={style.inputText} type='password' placeholder='Password' value={data.password} onChange={e => setData({ ...data, password: e.target.value })} required/>
          <br/>
          <button className={`${style.loginBtn} mt-4 btn btn-dark`} type='submit'>
            {!loadingState && 'Login'}
            {loadingState && <Spinner/>}
          </button>

        </form>
        <div className='mt-3'>
          <div className='text-white text-center my-2'>Not a member yet?</div>
          <div className='d-flex justify-content-center w-100'>
            <a href="/register"><button className={style.toRegisterBtn}>Start using GenVoice</button></a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
