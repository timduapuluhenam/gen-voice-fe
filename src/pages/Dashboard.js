import React from 'react'

import Sidebar from '../components/Sidebar'

const Dashboard = () => {
  return (
    <div className='d-flex justify-content-end'>
      <Sidebar className='position-sticky' />
      <div className='w-100'>
        <nav className='bg-dark' style={{ height: '12vh' }}>

        </nav>
      </div>
    </div>
  )
}

export default Dashboard
