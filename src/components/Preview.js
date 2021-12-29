import React from 'react'
import { useLocation } from 'react-router-dom'
import { addInvoice } from '../services/invoice'
import { useCookies } from 'react-cookie'

const Preview = () => {
  const { state } = useLocation()
  const [cookie] = useCookies()
  const handleSubmit = () => {
    addInvoice(state.sendData, cookie.token)
  }
  console.log(cookie.token)
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
      <button onClick={handleSubmit} className='btn btn-info text-white'>Send</button>
    </div>
  )
}

export default Preview
