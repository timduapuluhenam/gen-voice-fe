import React, { useState } from 'react'

import Sidebar from '../components/Sidebar'

import style from '../assets/style/dashboard.module.css'

import ReactModal from 'react-modal'

const Dashboard = () => {
  const [toggleUpload, setToggleUpload] = useState(false)

  const handleToggleUpload = () => {
    setToggleUpload(!toggleUpload)
  }

  return (
    <div className='d-flex justify-content-end'>
      <Sidebar className='position-sticky' />
      <div className='w-100'>
        <nav className={`d-flex justify-content-between ${style.headerDashboard}`} style={{ height: '12vh' }}>
          <div style={{ margin: 'auto 20px' }} className={style.titleDashboard}>
            Dashboard
          </div>
          <div style={{ margin: 'auto 20px' }}>
            <button className={style.addDataBtn} onClick={handleToggleUpload}>
              Add Data
            </button>
            <ReactModal isOpen={toggleUpload} contentLabel="Upload your data" className={style.fileUpload} onRequestClose={handleToggleUpload}>
              <form className='form-control p-4'>
                <div className='my-3'>
                  <input type='text' className='form-control' name='invoice_name' placeholder='Invoice Name'/>
                </div>
                <div className="input-group my-3">
                  <input type="file" className="form-control" id="inputGroupFile02" accept='.csv, .xlsx'/>
                  <label className="input-group-text" htmlFor="inputGroupFile02">Upload</label>
                </div>
                <button className='btn btn-danger me-2' onClick={handleToggleUpload}>Close</button>
                <input type='submit' value='Preview' className='btn btn-info text-white'/>
              </form>
            </ReactModal>
          </div>
        </nav>
      </div>
    </div>
  )
}

export default Dashboard
