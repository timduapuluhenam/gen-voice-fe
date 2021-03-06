import React, { useState } from 'react'

import Sidebar from '../components/Sidebar'
import Preview from '../components/Preview'
import MainDashboard from '../components/MainDashboard'

import style from '../assets/style/dashboard.module.css'

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import ReactModal from 'react-modal'
import readXlsxFile from 'read-excel-file'
import Papa from 'papaparse'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { useTitle } from 'react-use'
import { useDispatch } from 'react-redux'
import { setPage } from '../utils/reducers/pageReducer'
import { useCookies } from 'react-cookie'
import Error from './Error'

ReactModal.setAppElement('#root')

const Dashboard = () => {
  useTitle('Dashboard')
  const [cookie] = useCookies()
  const [selectedFile, setSelectedFile] = useState(null)
  const [invoiceName, setInvoiceName] = useState('')
  const [extension, setExtension] = useState('')
  const [toggleUpload, setToggleUpload] = useState(false)
  const [date, setDate] = useState(new Date())

  const dispatch = useDispatch()
  dispatch(setPage('Dashboard'))

  const navigate = useNavigate()

  if (!cookie.token) {
    window.location.replace('/login')
  }

  const today = new Date()

  const handleToggleUpload = () => {
    setToggleUpload(!toggleUpload)
  }

  const handleFileChange = e => {
    const file = e.target.files[0]
    setSelectedFile(file)
    const lastDot = file.name.lastIndexOf('.')
    setExtension(file.name.substring(lastDot + 1))
  }

  const handleUploadForm = e => {
    e.preventDefault()
    const data = {
      invoice: {
        name: invoiceName,
        TimeExpired: parseInt(Math.floor((date - today) / (1000 * 60 * 60 * 24)))
      },
      invoiceDetails: []
    }
    if (extension === 'xlsx') {
      readXlsxFile(selectedFile).then(rows => {
        rows.shift()
        for (const row of rows) {
          const emailChecker = /\S+@\S+\.\S+/
          if (!emailChecker.test(row[1])) {
            alert('Your schema is not valid')
            return null
          }

          const numberChecker = /^[0-9]*$/
          if (!numberChecker.test(row[2])) {
            alert('One of your amount row is not valid. Please fix it!')
            return null
          }
          const temp = {
            name: row[0],
            email: row[1],
            amount: parseInt(row[2])
          }
          data.invoiceDetails.push(temp)
        }
        setToggleUpload(false)
        navigate('preview_data', { state: { showData: rows, sendData: data } })
      })
    } else if (extension === 'csv') {
      Papa.parse(selectedFile, {
        complete: results => {
          const tempData = results.data
          tempData.shift()
          tempData.pop()
          for (const row of tempData) {
            const emailChecker = /\S+@\S+\.\S+/
            if (!emailChecker.test(row[1])) {
              alert('One of your email row is not valid. Please fix it!')
              return null
            }

            const numberChecker = /^[0-9]*$/
            if (!numberChecker.test(row[2])) {
              alert('One of your amount row is not valid. Please fix it!')
              return null
            }
            const temp = {
              name: row[0],
              email: row[1],
              amount: parseInt(row[2])
            }
            data.invoiceDetails.push(temp)
          }
          setToggleUpload(false)
          navigate('preview_data', { state: { showData: tempData, sendData: data } })
        }
      })
    }
  }

  return (
    <div className='d-flex justify-content-end' style={{ overflowX: 'hidden' }}>
      <Sidebar/>
      <div className={style.container}>
        <nav className={`d-flex justify-content-between ${style.headerDashboard}`} style={{ height: '12vh' }}>
          <div style={{ margin: 'auto 20px' }} className={style.titleDashboard}>
            Dashboard
          </div>
          <div style={{ margin: 'auto 20px' }}>
            <button className={style.addDataBtn} onClick={handleToggleUpload}>
              Add Data
            </button>
            <ReactModal isOpen={toggleUpload} contentLabel="Upload your data" className={style.fileUpload} onRequestClose={handleToggleUpload}>
              <form className='form-control p-4' onSubmit={handleUploadForm}>
                <h3>Upload your data</h3>
                <div className='my-3'>
                  <label>Invoice Name</label>
                  <input type='text' className='form-control' name='invoice_name' placeholder='Enter your invoice name' onChange={e => setInvoiceName(e.target.value)}/>

                  <div className='my-3'>
                    <label>Expired Time</label>
                    <DatePicker className='form-control w-25' selected={date} onChange={date => setDate(date)} minDate={today} dateFormat="d MMMM yyyy"/>
                  </div>
                </div>
                <div className="input-group my-4">
                  <input type="file" className="form-control" id="inputGroupFile02" accept='.csv, .xlsx' onChange={handleFileChange} />
                  <label className="input-group-text" htmlFor="inputGroupFile02">Upload</label>
                </div>
                <button className='btn btn-danger me-2' onClick={handleToggleUpload}>Close</button>
                <input type='submit' value='Preview' className='btn btn-info text-white'/>
              </form>
            </ReactModal>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<MainDashboard />}/>
          <Route path="preview_data" element={<Preview />}/>
          <Route path="*" element={<Error/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default Dashboard
