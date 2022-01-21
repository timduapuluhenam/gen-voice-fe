import React from 'react'

const Error = () => {
  const style = {
    width: '100%',
    height: '100vh'
  }
  return (
    <div className='d-flex justify-content-center text-center' style={style}>
      <div style={{ margin: 'auto' }}>
        <span style={{ fontSize: '3em' }}>404</span><br/>
        <span className='fs-3'>Page not found</span>
      </div>
    </div>
  )
}

export default Error
