import React from 'react'
import { useTitle } from 'react-use'
import { setPage } from '../utils/reducers/pageReducer'
import { useDispatch } from 'react-redux'

import Sidebar from '../components/Sidebar'

import style from '../assets/style/reports.module.css'

const Settings = () => {
  useTitle('Settings')

  const dispatch = useDispatch()
  dispatch(setPage('Settings'))
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
              <div className='col-sm-4 my-2'>
                <label>
                  Edit your username
                </label>
                <input type="text" className="form-control"/>
                <input type="button" className='btn btn-info text-white my-2' value='Save Username'/>
              </div>
              <div className='col-sm-4 my-2'>
                <label>
                  Enter your current passsword
                </label>
                <input type="password" className="form-control"/>
                <label>
                  Enter your new password
                </label>
                <input type="password" className="form-control"/>
                <input type="button" className='btn btn-info text-white my-2' value='Save New Password'/>
              </div>
              <div className='col-sm-4 my-2'>
                <label>
                  Enter your current passsword
                </label>
                <input type="password" className="form-control"/>
                <label>
                  Enter your new password
                </label>
                <input type="password" className="form-control"/>
                <input type="button" className='btn btn-info text-white my-2' value='Save New Password'/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
