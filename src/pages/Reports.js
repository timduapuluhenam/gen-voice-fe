import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import { useTitle } from 'react-use'
// import style from '../assets/style/mainDashboard.css'
import style from '../assets/style/reports.module.css'
import { useNavigate } from 'react-router-dom'

import { useCookies } from 'react-cookie'
import { getInvoice, getListInvoice } from '../services/invoice'
import generatePDF from '../services/reportGenerator'
import { useDispatch } from 'react-redux'
import { setPage } from '../utils/reducers/pageReducer'

const Reports = () => {
  useTitle('Reports')
  const [invoiceList, setInvoiceList] = useState([])
  const [invoiceFilter, setInvoiceFilter] = useState({
    invoiceName: 'all',
    invoicePeriode: 'this week',
    invoiceStatus: 'all'
  })
  const [invoiceDetailsData, setInvoiceDetailsData] = useState([])
  const [filteredData, setFilteredData] = useState([])

  const navigate = useNavigate()
  const [cookie] = useCookies()
  const token = cookie.token
  if (!token) {
    navigate('/login')
  }
  // const { data: invoiceListData, loading: loadingInvoiceList } = useQuery(getInvoiceNameByUserId, { variables: { user_id: userId } })

  const dispatch = useDispatch()
  dispatch(setPage('Reports'))

  useEffect(() => {
    getInvoice(cookie.token)
      .then(res => setInvoiceDetailsData(res.data))
      .catch(e => console.log(e))

    getListInvoice(cookie.token)
      .then(res => setInvoiceList(res.data))
      .catch(e => console.log(e))
  }, [])

  const handleGenerateReport = e => {
    e.preventDefault()
    let temp = invoiceDetailsData
    if (invoiceFilter.invoiceStatus === 'paid') {
      temp = temp?.reduce((filtered, invoice) => {
        if (invoice.status === 'Paid') {
          filtered.push({ ...invoice })
        }
        return filtered
      }, [])
    } else if (invoiceFilter.invoiceStatus === 'unpaid') {
      temp = temp?.reduce((filtered, invoice) => {
        if (invoice.status === 'Not Paid') {
          filtered.push({ ...invoice })
        }
        return filtered
      }, [])
    }

    if (invoiceFilter.invoiceName !== 'all') {
      temp = temp?.reduce((filtered, invoice) => {
        if (invoice.event_id === parseInt(invoiceFilter.invoiceName)) {
          filtered.push({ ...invoice })
        }
        return filtered
      }, [])
    }
    setFilteredData(temp)
  }
  return (
    <div className='d-flex justify-content-end' style={{ overflowX: 'hidden' }}>
      <Sidebar/>
      <div className={style.container}>
        <nav className={`d-flex justify-content-between ${style.headerDashboard}`} style={{ height: '12vh' }}>
          <div style={{ margin: 'auto 20px' }} className={style.titleDashboard}>
            Reports
          </div>
        </nav>
        <div className='col p-3'>
          <div className="card">
            <div className="card-header fw-bold" style={{ background: '#DAE1E7' }}>
              Generate Reports
            </div>
            <div className='card-body '>
              <form onSubmit={handleGenerateReport}>
                <div className='row'>
                  <div className='col-sm-3'>
                    <label>
                      Invoice Title
                    </label>
                    <select className='form-select' onChange={e => setInvoiceFilter({ ...invoiceFilter, invoiceName: e.target.value })}>
                      <option value='all' defaultValue={true}>All</option>
                      {invoiceList && invoiceList?.map((invoice, i) =>
                        <option value={invoice.id} key={i}>{invoice.name}</option>
                      ) }
                      {!invoiceList && <option>Loading....</option>}
                    </select>
                  </div>
                </div>
                <div className='row my-2'>
                  <div className='col-sm-3'>
                    <label>
                      Status
                    </label>
                    <select className='form-select' onChange={e => setInvoiceFilter({ ...invoiceFilter, invoiceStatus: e.target.value })}>
                      <option value='all' defaultValue={true}>All</option>
                      <option value='paid'>Paid</option>
                      <option value='unpaid'>Unpaid</option>
                    </select>
                  </div>
                </div>
                <div className='mb-2 mt-4 d-flex justify-content-between'>
                    <button type='submit' className='btn btn-info text-white'>Generate Report</button>
                    <button type='button' className='btn btn-success' onClick={() => generatePDF(filteredData, cookie.name)}>Download Report</button>
                </div>
              </form>
            </div>
          </div>
          {filteredData.length === 0 && <h5 className='mt-3'>Please generate your report first...</h5>}
          {filteredData.length !== 0 &&
          <table className="table table-bordered my-2" style={{ fontSize: '0.75em' }}>
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Invoice Name</th>
                <th scope="col">Date Issued</th>
                <th scope="col">Date Paid</th>
                <th scope="col">Amount</th>
                <th scope='col'>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length !== 0 && filteredData?.map((invoice, i) => {
                return (
                  <tr key={i}>
                    <td scope="row">{i + 1}</td>
                    <td>{invoice.name}</td>
                    <td>{invoice.invoice_name}</td>
                    <td>{new Date(invoice.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</td>
                    <td>{invoice.created_at !== invoice.updated_at && new Date(invoice.updated_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) }</td>
                    <td>{Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(invoice.amount)}</td>
                    <td>
                      {invoice.status === 'Not Paid' && <span className='text-danger fw-bold'>Not Paid</span>}
                      {invoice.status === 'Paid' && <span className='text-success fw-bold'>Paid</span>}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          }
        </div>
      </div>
    </div>
  )
}

export default Reports
