import React, { useRef, useState, useEffect } from 'react'

import style from '../assets/style/mainDashboard.css'

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
import faker from 'faker'

import { useSubscription } from '@apollo/client'
import { getTotalOutstanding } from '../services/graphqlQuery'

import { HiOutlineClock } from 'react-icons/hi'
import { MdDone, MdPerson } from 'react-icons/md'
import { AiOutlineWarning } from 'react-icons/ai'
// import { useCookie } from 'react-use'

ChartJs.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

const labels = ['Monday', 'Thursday', 'Wednesday', 'Tuesday', 'Friday', 'Saturday', 'Sunday']

const initData = {
  labels,
  datasets: [
    {
      label: 'Invoiced',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 5000 })),
      backgroundColor: '#1F3A57'
    },
    {
      label: 'Received',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 5000 })),
      backgroundColor: '#00909E'
    }
  ]
}

const MainDashboard = () => {
  const chartRef = useRef()
  const [totalOutstanding, setTotalOutstanding] = useState(0)
  const { data: totalOutstandingData } = useSubscription(getTotalOutstanding, { variables: { user_id: 4 } })

  console.log(totalOutstandingData)
  useEffect(() => {
    setTotalOutstanding(totalOutstandingData)
  }, [totalOutstandingData])

  const handleTimeStampChange = e => {
    const timeStamp = e.target.value
    let newLabel = []

    if (timeStamp === 'week') {
      newLabel = labels
    } else if (timeStamp === 'month') {
      const label = []
      for (let x = 0; x <= 31; x++) label.push(x)
      newLabel = label
    } else if (timeStamp === 'sixMonths') {
      const label = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun']
      newLabel = label
    } else if (timeStamp === 'year') {
      const label = ['Jan', 'Feb', 'Mar', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']
      newLabel = label
    }
    const data = {
      newLabel,
      datasets: [
        {
          label: 'Invoiced',
          data: newLabel.map(() => faker.datatype.number({ min: 0, max: 5000 })),
          backgroundColor: '#1F3A57'
        },
        {
          label: 'Received',
          data: newLabel.map(() => faker.datatype.number({ min: 0, max: 5000 })),
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
          padding: 15
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
        <div className='col me-1'>
          <div className="card">
            <div className="card-header fw-bold" style={{ background: '#DAE1E7' }}>
              Recent Activities
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">An item</li>
              <li className="list-group-item">A second item</li>
              <li className="list-group-item">A third item</li>
              <li className="list-group-item">A third item</li>
            </ul>
          </div>
        </div>
        <div className='col'>
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
                  {totalOutstanding}
                </div>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <div>
                  <AiOutlineWarning className='align-middle'/>
                  <span className='align-middle px-2'>Total Overdue:</span>
                </div>
                <div>
                  123124123
                </div>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <div>
                  <MdDone className='align-middle'/>
                  <span className='align-middle px-2'>Total Collected:</span>
                </div>
                <div>
                  123124123
                </div>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <div>
                  <MdPerson className='align-middle'/>
                  <span className='align-middle px-2'>Clients:</span>
                </div>
                <div>
                  123124123
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
              <select className="form-select w-25" onChange={handleTimeStampChange}>
                <option defaultValue={true} value='week'>Last Week</option>
                <option value="month">Last Month</option>
                <option value="sixMonths">Last 6 Months</option>
                <option value="year">Last Year</option>
              </select>
            </div>
            <Bar ref={chartRef} options={options} data={initData} redraw className='m-3'/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainDashboard
