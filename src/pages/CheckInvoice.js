import React, { useState } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

import { getInvoiceById } from '../services/invoice'

import style from '../assets/style/checkInvoice.module.css'

const CheckInvoice = () => {
  const [invoiceId, setInvoiceId] = useState('')
  const [invoiceData, setInvoiceData] = useState()

  const handleCheckInvoice = e => {
    e.preventDefault()
    getInvoiceById(invoiceId)
      .then(res => setInvoiceData(res.data))
      .catch(err => console.log(err))
  }
  return (
    <div>
      <Navbar/>
      <div className='d-flex justify-content-center p-5' style={{ background: '#1F3A57' }}>
        <div className='container'>
          <h2 className='text-center text-white fw-bold'>Check Your Invoice</h2>
          <form className={`${style.form} row d-flex justify-content-center m-auto mt-4`} onSubmit={handleCheckInvoice}>
            <div className='col-sm-8'>
              <input type='text' placeholder='Enter your Invoice ID' className='form-control' onChange={e => setInvoiceId(e.target.value)}/>
            </div>
            <div className='col-sm-2'>
              <button className='btn btn-info text-white' type='submit'>Check</button>
            </div>
          </form>
        </div>
      </div>
      <div className='container my-2 py-5'>
        <table className='table'>
          <thead>
            <tr>
              <th scope='col'>Name</th>
              <th scope='col'>Amount</th>
              <th scope='col'>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{invoiceData?.name}</td>
              <td>{invoiceData?.amount}</td>
              <td>{invoiceData?.status}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <Footer/>
    </div>
  )
}

export default CheckInvoice
