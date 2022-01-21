import React, { useRef, useState, useEffect } from 'react'

import style from '../assets/style/mainDashboard.module.css'

import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { useCookies } from 'react-cookie'

import { useSubscription } from '@apollo/client'
import { getTotalOutstanding, getTotalClients, getTotalCollected, getLatestActivity, getTotalReceivedByTime, getTotalInvoicedByTime } from '../services/graphqlQuery'

import { HiOutlineClock } from 'react-icons/hi'
import { MdDone, MdPerson } from 'react-icons/md'
import Spinner from './Spinner'
import LoaderChart from './LoaderChart'
import { getLast30Days, getLast6Month, getLast7Days, getLastYear, getLastWeek, getLastMonth, getLastSixMonthDate, getLastYearDate } from '../utils/date'

ChartJs.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

const MainDashboard = () => {
  const [cookie] = useCookies()
  const chartRef = useRef()
  const [totalOutstanding, setTotalOutstanding] = useState(0)
  const [totalClients, setTotalClients] = useState()
  const [loadingChartState, setLoadingChartState] = useState(true)
  const [invoiceLastWeek, setInvoiceLastWeek] = useState([])
  const [receivedLastWeek, setReceivedLastWeek] = useState([])
  const [invoiceLastMonth, setInvoiceLastMonth] = useState([])
  const [receivedLastMonth, setReceivedLastMonth] = useState([])
  const [invoiceLast6Months, setInvoiceLast6Months] = useState([])
  const [receiveLast6Months, setReceiveLast6Months] = useState([])
  const [invoiceLastYear, setInvoiceLastYear] = useState([])
  const [receiveLastYear, setReceiveLastYear] = useState([])
  const [totalCollected, setTotalCollected] = useState()
  const [latestActivity, setLatestActivity] = useState()
  console.log(latestActivity)

  const { data: collected, loading: loadingCollected } = useSubscription(getTotalCollected, { variables: { user_id: parseInt(cookie.userId) } })
  const { data: lastWeek } = useSubscription(getTotalInvoicedByTime, { variables: { today: getLastWeek(), userId: parseInt(cookie.userId) } })
  const { data: dataReceivedLastWeek } = useSubscription(getTotalReceivedByTime, { variables: { today: getLastWeek(), userId: parseInt(cookie.userId) } })

  // * LAST MONTH SUBSCRIPTION
  const { data: dataInvoicedLastMonth, loading: loadingInvoicedLastMonth } = useSubscription(getTotalInvoicedByTime, { variables: { today: getLastMonth(), userId: parseInt(cookie.userId) } })
  const { data: dataReceivedLastMonth, loading: loadingReceivedLastMonth } = useSubscription(getTotalReceivedByTime, { variables: { today: getLastMonth(), userId: parseInt(cookie.userId) } })

  // * LAST 6 MONTHS SUBSCRIPTION
  const { data: dataInvoicedLast6Months, loading: loadingInvoicedLast6Months } = useSubscription(getTotalInvoicedByTime, { variables: { today: getLastSixMonthDate(), userId: parseInt(cookie.userId) } })
  const { data: dataReceivedLast6Months, loading: loadingReceivedLast6Month } = useSubscription(getTotalReceivedByTime, { variables: { today: getLastSixMonthDate(), userId: parseInt(cookie.userId) } })

  // * LAST 6 MONTHS SUBSCRIPTION
  const { data: dataInvoicedLastYear, loading: loadingInvoicedLastYear } = useSubscription(getTotalInvoicedByTime, { variables: { today: getLastYearDate(), userId: parseInt(cookie.userId) } })
  const { data: dataReceivedLastYear, loading: loadingReceivedLastYear } = useSubscription(getTotalReceivedByTime, { variables: { today: getLastYearDate(), userId: parseInt(cookie.userId) } })

  const { data: clients, loading: loadingClients } = useSubscription(getTotalClients, { variables: { user_id: parseInt(cookie.userId) } })
  const { data, loading } = useSubscription(getTotalOutstanding, { variables: { user_id: parseInt(cookie.userId) } })

  const { data: dataLatestActivity, loading: loadingActivity } = useSubscription(getLatestActivity, { variables: { userId: parseInt(cookie.userId) } })

  useEffect(() => {
    const total = data?.invoice_details_aggregate.aggregate.sum.amount
    setTotalOutstanding(total)
  }, [data])

  useEffect(() => {
    const total = clients?.invoice_details_aggregate.aggregate.count
    setTotalClients(total)
  }, [clients])

  useEffect(() => {
    const data = dataLatestActivity?.activities
    setLatestActivity(data)
  }, [dataLatestActivity])

  //* ------------------- LAST WEEK SECTION -------------------------
  useEffect(() => {
    lastWeek?.invoice_details.map((invoice, id) => (
      invoice.created_at = new Date(invoice.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    ))
    const data = lastWeek?.invoice_details
    const last7Days = getLast7Days()
    const temp = []
    for (const day in last7Days) {
      const filteredData = data?.filter(invoice => invoice.created_at === last7Days[day])
      if (filteredData) {
        const total = Object.values(filteredData).reduce((t, { amount }) => t + amount, 0)
        if (total === 0) {
          temp.push(0)
        } else {
          temp.push(total)
        }
      }
    }
    setInvoiceLastWeek(temp)
    if (data) {
      setLoadingChartState(false)
    }
  }, [lastWeek])

  useEffect(() => {
    dataReceivedLastWeek?.invoice_details.map((invoice, id) => (
      invoice.created_at = new Date(invoice.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    ))
    const data = dataReceivedLastWeek?.invoice_details
    const last7Days = getLast7Days()
    const temp = []
    for (const day in last7Days) {
      const filteredData = data?.filter(invoice => invoice.created_at === last7Days[day])
      if (filteredData) {
        const total = Object.values(filteredData).reduce((t, { amount }) => t + amount, 0)
        if (total === 0) {
          temp.push(0)
        } else {
          temp.push(total)
        }
      }
    }
    setReceivedLastWeek(temp)
  }, [dataReceivedLastWeek])

  //* ------------------- LAST MONTH SECTION -------------------------
  // INVOICED LAST MONTH
  useEffect(() => {
    dataInvoicedLastMonth?.invoice_details.map((invoice, id) => (
      invoice.created_at = new Date(invoice.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    ))
    const data = dataInvoicedLastMonth?.invoice_details
    const last30Days = getLast30Days()
    const temp = []
    for (const day in last30Days) {
      const filteredData = data?.filter(invoice => invoice.created_at === last30Days[day])
      if (filteredData) {
        const total = Object.values(filteredData).reduce((t, { amount }) => t + amount, 0)
        if (total === 0) {
          temp.push(0)
        } else {
          temp.push(total)
        }
      }
    }
    setInvoiceLastMonth(temp)
  }, [loadingInvoicedLastMonth])
  // RECEIVED LAST MONTH
  useEffect(() => {
    dataReceivedLastMonth?.invoice_details.map((invoice, id) => (
      invoice.created_at = new Date(invoice.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    ))
    const data = dataReceivedLastWeek?.invoice_details
    const last30Days = getLast30Days()
    const temp = []
    for (const day in last30Days) {
      const filteredData = data?.filter(invoice => invoice.created_at === last30Days[day])
      if (filteredData) {
        const total = Object.values(filteredData).reduce((t, { amount }) => t + amount, 0)
        if (total === 0) {
          temp.push(0)
        } else {
          temp.push(total)
        }
      }
    }
    setReceivedLastMonth(temp)
  }, [loadingReceivedLastMonth])

  //* ------------------- LAST 6 MONTHS SECTION --------------
  useEffect(() => {
    dataInvoicedLast6Months?.invoice_details.map((invoice, id) => (
      invoice.created_at = new Date(invoice.created_at).toLocaleDateString('en-US', { month: 'long' })
    ))
    const data = dataInvoicedLast6Months?.invoice_details
    const last6Months = getLast6Month()
    const temp = []
    for (const month in last6Months) {
      const filteredData = data?.filter(invoice => invoice.created_at === last6Months[month])
      if (filteredData) {
        const total = Object.values(filteredData).reduce((t, { amount }) => t + amount, 0)
        if (total === 0) {
          temp.push(0)
        } else {
          temp.push(total)
        }
      }
    }
    setInvoiceLast6Months(temp)
  }, [loadingInvoicedLast6Months])

  useEffect(() => {
    dataReceivedLast6Months?.invoice_details.map((invoice, id) => (
      invoice.created_at = new Date(invoice.created_at).toLocaleDateString('en-US', { month: 'long' })
    ))
    const data = dataReceivedLast6Months?.invoice_details
    const last6Months = getLast6Month()
    const temp = []
    for (const month in last6Months) {
      const filteredData = data?.filter(invoice => invoice.created_at === last6Months[month])
      if (filteredData) {
        const total = Object.values(filteredData).reduce((t, { amount }) => t + amount, 0)
        if (total === 0) {
          temp.push(0)
        } else {
          temp.push(total)
        }
      }
    }
    setReceiveLast6Months(temp)
  }, [loadingReceivedLast6Month])

  //* ------------------- LAST YEAR SECTION --------------
  useEffect(() => {
    dataInvoicedLastYear?.invoice_details.map((invoice, id) => (
      invoice.created_at = new Date(invoice.created_at).toLocaleDateString('en-US', { month: 'long' })
    ))
    const data = dataInvoicedLastYear?.invoice_details
    const lastYear = getLastYear()
    const temp = []
    for (const month in lastYear) {
      const filteredData = data?.filter(invoice => invoice.created_at === lastYear[month])
      if (filteredData) {
        const total = Object.values(filteredData).reduce((t, { amount }) => t + amount, 0)
        if (total === 0) {
          temp.push(0)
        } else {
          temp.push(total)
        }
      }
    }
    setInvoiceLastYear(temp)
  }, [loadingInvoicedLastYear])

  useEffect(() => {
    dataReceivedLastYear?.invoice_details.map((invoice, id) => (
      invoice.created_at = new Date(invoice.created_at).toLocaleDateString('en-US', { month: 'long' })
    ))
    const data = dataReceivedLastYear?.invoice_details
    const lastYear = getLastYear()
    const temp = []
    for (const month in lastYear) {
      const filteredData = data?.filter(invoice => invoice.created_at === lastYear[month])
      if (filteredData) {
        const total = Object.values(filteredData).reduce((t, { amount }) => t + amount, 0)
        if (total === 0) {
          temp.push(0)
        } else {
          temp.push(total)
        }
      }
    }
    setReceiveLastYear(temp)
  }, [loadingReceivedLastYear])

  useEffect(() => {
    const total = collected?.invoice_details_aggregate.aggregate.sum.amount
    setTotalCollected(total)
  }, [collected])
  const labels = getLast7Days()

  const initData = {
    labels,
    datasets: [
      {
        label: 'Invoiced',
        data: invoiceLastWeek,
        backgroundColor: '#1F3A57'
      },
      {
        label: 'Received',
        data: receivedLastWeek,
        backgroundColor: '#00909E'
      }
    ]
  }
  const handleTimeStampChange = e => {
    const timeStamp = e.target.value
    let newLabel = []
    let newInvoiceData = []
    let newReceivedData = []

    if (timeStamp === 'week') {
      newLabel = getLast7Days()
      newInvoiceData = invoiceLastWeek
      newReceivedData = receivedLastWeek
    } else if (timeStamp === 'month') {
      newLabel = getLast30Days()
      newInvoiceData = invoiceLastMonth
      newReceivedData = receivedLastMonth
    } else if (timeStamp === 'sixMonths') {
      newLabel = getLast6Month()
      newInvoiceData = invoiceLast6Months
      newReceivedData = receiveLast6Months
    } else if (timeStamp === 'year') {
      newLabel = getLastYear()
      newInvoiceData = invoiceLastYear
      newReceivedData = receiveLastYear
    }
    const data = {
      newLabel,
      datasets: [
        {
          label: 'Invoiced',
          data: newInvoiceData,
          backgroundColor: '#1F3A57'
        },
        {
          label: 'Received',
          data: newReceivedData,
          backgroundColor: '#00909E'
        }
      ]
    }
    const chart = chartRef.current
    chart.data.labels = []
    chart?.data.datasets.forEach(dataset => {
      dataset.data = []
    })

    for (const element of newLabel) {
      chart.data.labels.push(element)
    }

    let i = 0
    while (i < 2) {
      const newData = data.datasets[i].data
      chart.data.datasets[i].data = newData
      i++
    }
    chart.update()
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        align: 'start',
        labels: {
          padding: 10
        }
      },
      title: {
        display: false,
        text: 'Invoiced/Received'
      }
    }
  }
  return (
    <div className={style.main} style={{ padding: '20px 20px' }}>
      <div className='row'>
        <div className='col my-3'>
          <div className="card">
            <div className="card-header fw-bold" style={{ background: '#DAE1E7' }}>
              Recent Activities
            </div>
            {loadingActivity && <li className='list-group-item'><Spinner/> Please Wait..</li>}
            {!loadingActivity &&
            <ul className="list-group list-group-flush">
              {latestActivity?.map((act, i) =>
                <li className='list-group-item' key={i}>{act.activity}</li>
              )}
            </ul>}
          </div>
        </div>
        <div className='col my-3'>
          <div className="card">
            <div className="card-header fw-bold" style={{ background: '#DAE1E7' }}>
              Summary
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item d-flex justify-content-between">
                <div>
                  <HiOutlineClock className='align-middle'/>
                  <span className='align-middle px-2'>Total Outsanding:</span>
                </div>
                <div>
                  {!loading && Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(totalOutstanding)}
                  {loading && <Spinner/>}
                </div>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <div>
                  <MdDone className='align-middle'/>
                  <span className='align-middle px-2'>Total Collected:</span>
                </div>
                <div>
                  {loadingCollected && <Spinner/>}
                  {!loadingCollected && Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(totalCollected)}
                </div>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <div>
                  <MdPerson className='align-middle'/>
                  <span className='align-middle px-2'>Clients:</span>
                </div>
                <div>
                  {loadingClients && <Spinner/>}
                  {!loadingClients && totalClients}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className='row my-3'>
        <div className='col'>
          <div className="card">
            <div className="card-header d-flex justify-content-between" style={{ background: '#DAE1E7' }}>
              <div className='d-flex align-items-center fw-bold'>
                Invoiced/Received
              </div>
              <select className={`${style.periodChart} form-select`} onChange={handleTimeStampChange}>
                <option defaultValue={true} value='week'>Last Week</option>
                <option value="month">Last Month</option>
                <option value="sixMonths">Last 6 Months</option>
                <option value="year">Last Year</option>
              </select>
            </div>
            {loadingChartState && <LoaderChart className='m-3'/>}
            {!loadingChartState && <Bar ref={chartRef} options={options} data={initData} redraw className='m-3'/>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainDashboard
