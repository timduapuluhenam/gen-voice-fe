import React, { useState } from 'react'
import style from '../assets/style/loginRegister.module.css'

import registerService from '../services/register'

import Spinner from '../components/Spinner'
import { useNavigate } from 'react-router-dom'
import { useTitle } from 'react-use'

const Register = () => {
  useTitle('Register')
  const navigate = useNavigate('')

  const [loadingState, setLoadingState] = useState(false)

  const [data, setData] = useState({
    email: '',
    name: '',
    username: '',
    address: '',
    password: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoadingState(true)

    try {
      await registerService(data)
      navigate('/login')
    } catch (exception) {
      console.log(exception)
    }
  }
  return (
    <div className={`container-fluid ${style.register} d-flex justify-content-center`}>
      <div className={style.container}>
        <div className={`fw-bold text-center my-3 ${style.logo}`}>GenVoice</div>
        <div className={`fw-lighter text-center my-2 ${style.textAfterLogo}`}>Thank you for choosing invoicely. You&#39;re just a few steps away <br/> from unlimited invoicing.</div>
        <form className='form form-control p-4' style={{ background: '#DAE1E7' }} onSubmit={handleSubmit}>
          {/* --- Input Email --- */}
          <label htmlFor='email' className='mt-2'>Email Address</label><br/>
          <input className={style.inputText} type='email' placeholder='Email' name='email' value={data.email} onChange={e => setData({ ...data, email: e.target.value })} required/><br/>
          {/* --- Input Name --- */}
          <label htmlFor='name' className='mt-2'>Name</label><br/>
          <input className={style.inputText} type='text' placeholder='Name' name='name' value={data.name} onChange={e => setData({ ...data, name: e.target.value })} required/><br/>
          {/* --- Input Userame --- */}
          <label htmlFor='name' className='mt-2'>Username</label><br/>
          <input className={style.inputText} type='text' placeholder='Username' name='name' value={data.username} onChange={e => setData({ ...data, username: e.target.value })} required/><br/>
          {/* --- Input Address --- */}
          <label htmlFor='address' className='mt-2'>Address</label><br/>
          <input className={style.inputText} type='text' placeholder='Address' name='address' value={data.address} onChange={e => setData({ ...data, address: e.target.value })} required/><br/>
          {/* --- Input Password --- */}
          <label htmlFor='password' className='mt-2'>Password</label><br/>
          <input className={style.inputText} type='password' placeholder='Password' value={data.password} onChange={e => setData({ ...data, password: e.target.value })} required/>
          <button className={`${style.loginBtn} mt-4 btn btn-dark`} type='submit'>
            {!loadingState && 'Register'}
            {loadingState && <Spinner/>}
          </button>
        </form>
        <div className='mt-3'>
          <div className='text-white text-center my-2'>Already a member?</div>
          <div className='d-flex justify-content-center w-100 my-3'>
            <a href="/login"><button className={style.toRegisterBtn}>Login</button></a>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Register
