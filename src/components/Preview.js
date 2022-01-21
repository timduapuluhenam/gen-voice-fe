import React, { useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { addInvoice } from '../services/invoice'
import { useCookies } from 'react-cookie'
import Spinner from './Spinner'

const Preview = () => {
  const { state } = useLocation()
  const [cookie] = useCookies()
  const [alert, setAlert] = useState('')
  const [loading, setLoading] = useState(false)
  const handleSubmit = async () => {
    setLoading(true)
    try {
      const response = await addInvoice(state.sendData, cookie.token)
      console.log(response)
      if (response) {
        setAlert('success')
      }
      setLoading(false)
    } catch (e) {
      setAlert('error')
      setLoading(false)
    }
  }

  if (!state) {
    return (
      <div style={{ margin: '10px 20px' }}>
        <h3>Please upload the file first before preview it! </h3>
      </div>
    )
  }
  return (
    <div style={{ margin: '10px 20px' }}>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Amount</th>
          </tr>
        </thead>
        <tbody>
          { state.showData.map((data, i) => {
            return (
              <tr key={i}>
                <td scope="row">{i + 1}</td>
                <td>{data[0]}</td>
                <td>{data[1]}</td>
                <td>{Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(data[2])}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <button onClick={handleSubmit} className='btn btn-info text-white'>
        {!loading && 'Send'}
        {loading && <Spinner/>}
      </button>
      {alert === 'success' &&
      <>
        <span className='text-success mx-3 p-1'>
          Data has been sent successfully
        </span>
        <Link to='/dashboard'>Back to Dashboard</Link>
      </> }

      {alert === 'error' &&
      <div className="alert alert-danger p-1 w-auto my-2" role="alert">
        There is an error when upload your data
      </div>}
    </div>
  )
}

export default Preview
