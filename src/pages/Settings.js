/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { useTitle } from 'react-use'
import { setPage } from '../utils/reducers/pageReducer'
import { useDispatch } from 'react-redux'

import Sidebar from '../components/Sidebar'

import style from '../assets/style/reports.module.css'
import { updateUser } from '../services/users'
import { useCookies } from 'react-cookie'
import Spinner from '../components/Spinner'

const Settings = () => {
  useTitle('Settings')
  const [cookies, setCookies, removeCookie] = useCookies()

  const dispatch = useDispatch()
  dispatch(setPage('Settings'))

  const [updatedProfile, setUpdatedProfile] = useState({
    name: '',
    address: '',
    email: '',
    password: ''
  })
  const initialState = {
    name: false,
    address: false,
    email: false,
    password: false
  }
  const [loading, setLoading] = useState(initialState)
  const [error, setError] = useState(initialState)
  const [success, setSuccess] = useState(initialState)
  const [displayEditForm, setDisplayEditForm] = useState(initialState)

  const handleUpdate = type => {
    if (type === 'email') {
      setLoading({ ...loading, email: true })
      updateUser(updatedProfile, cookies.token)
        .then(() => {
          setSuccess({ ...success, email: true })
          setLoading({ ...loading, email: false })
          removeCookie('email')
          setCookies('email', updatedProfile.email)
        })
        .catch(err => setError({ ...error, type: err }))
    } else if (type === 'password') {
      setLoading({ ...loading, password: true })
      updateUser(updatedProfile, cookies.token)
        .then(() => {
          setSuccess({ ...success, password: true })
          setLoading({ ...loading, password: false })
        })
        .catch(err => console.log(err))
    } else if (type === 'name') {
      setLoading({ ...loading, name: true })
      updateUser(updatedProfile, cookies.token)
        .then(() => {
          setSuccess({ ...success, name: true })
          setLoading({ ...loading, name: false })
          removeCookie('name')
          setCookies('name', updatedProfile.name)
        })
        .catch(err => setError({ ...error, name: err }))
    } else if (type === 'address') {
      setLoading({ ...loading, name: true })
      updateUser(updatedProfile, cookies.token)
        .then(() => {
          setSuccess({ ...success, address: true })
          setLoading({ ...loading, address: false })
          removeCookie('address')
          setCookies('address', updatedProfile.address)
        })
        .catch(err => setError({ ...error, address: err }))
    }
  }
  return (
    <div className='d-flex justify-content-end' style={{ overflowX: 'hidden' }}>
      <Sidebar/>
      <div className={style.container}>
        <nav className={`d-flex justify-content-between ${style.headerDashboard}`} style={{ height: '12vh' }}>
          <div style={{ margin: 'auto 20px' }} className={style.titleDashboard}>
            Settings
          </div>
        </nav>
        <div className='col p-3'>
          <div className="card">
            <div className="card-header fw-bold" style={{ background: '#DAE1E7' }}>
              Profile
            </div>
            <div className='card-body row d-flex flex-column'>
              <div className='col-sm my-2'>
                Name: <strong>{cookies.name}</strong>
                <button type='button' className='btn btn-info ms-2 text-white' onClick={() => setDisplayEditForm({ ...displayEditForm, name: true })}>Edit</button>
              </div>
              {displayEditForm.name &&
              <div className='col-sm-4 my-2'>
                <label>
                  Edit your name
                </label>
                <input type="text" className="form-control" onChange={e => setUpdatedProfile({ ...updatedProfile, name: e.target.value })}/>
                <button type="button" className={`btn ${success.name ? 'btn-success' : 'btn-info'} text-white my-2`} value='Update Name' onClick={() => handleUpdate('name')}>
                  {loading.name && <Spinner/>}
                  {!success.name && 'Update Name'}
                  {success.name && 'Done'}
                </button>
                <input type="button" className='btn btn-danger ms-2 text-white my-2' value='Close' onClick={() => setDisplayEditForm({ ...displayEditForm, name: false })}/>
              </div>}

              <div className='col-sm my-2'>
                Password
                <button type='button' className='btn btn-info ms-2 text-white' onClick={() => setDisplayEditForm({ ...displayEditForm, password: true })}>Edit</button>
              </div>
              {displayEditForm.password &&
              <div className='col-sm-4 my-2'>
                <label>
                  Enter your new password
                </label>
                <input type="password" className="form-control" onChange={e => setUpdatedProfile({ ...updatedProfile, password: e.target.value })}/>
                <button type="button" className={`btn ${success.password ? 'btn-success' : 'btn-info'} text-white my-2`} onClick={() => handleUpdate('password')}>
                  {loading.password && <Spinner/>}
                  {!success.password && 'Update Password'}
                  {success.password && 'Done'}
                </button>
                <input type="button" className='btn btn-danger ms-2 text-white my-2' value='Close' onClick={() => setDisplayEditForm({ ...displayEditForm, password: false })}/>
              </div>}

              <div className='col-sm my-2'>
                Address: <strong>{cookies.address}</strong>
                <button type='button' className='btn btn-info ms-2 text-white' onClick={() => setDisplayEditForm({ ...displayEditForm, address: true })}>Edit</button>
              </div>
              {displayEditForm.address &&
              <div className='col-sm-4 my-2'>
                <label>
                  Enter your new address
                </label>
                <input type="text" className="form-control" onChange={e => setUpdatedProfile({ ...updatedProfile, address: e.target.value })}/>
                <button type="button" className={`btn ${success.address ? 'btn-success' : 'btn-info'} text-white my-2`} value='Update Your Address' onClick={() => handleUpdate('address')}>
                  {loading.address && <Spinner/>}
                  {!success.address && 'Update Address'}
                  {success.address && 'Done'}
                </button>
                <input type="button" className='btn btn-danger ms-2 text-white my-2' value='Close' onClick={() => setDisplayEditForm({ ...displayEditForm, address: false })}/>
              </div>}

              <div className='col-sm my-2'>
                Email: <strong>{cookies.email}</strong>
                <button type='button' className='btn btn-info ms-2 text-white' onClick={() => setDisplayEditForm({ ...displayEditForm, email: true })}>Edit</button>
              </div>
              {displayEditForm.email &&
              <div className='col-sm-4 my-2'>
                <label>
                  Enter your new email
                </label>
                <input type="email" className="form-control" onChange={e => setUpdatedProfile({ ...updatedProfile, email: e.target.value })}/>
                <button type="button" className={`btn ${success.email ? 'btn-success' : 'btn-info'} text-white my-2`} onClick={() => handleUpdate('email')}>
                  {loading.email && <Spinner/>}
                  {!success.email && 'Update Email'}
                  {success.email && 'Done'}
                </button>
                <input type="button" className='btn btn-danger ms-2 text-white my-2' value='Close' onClick={() => setDisplayEditForm({ ...displayEditForm, email: false })}/>
              </div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
