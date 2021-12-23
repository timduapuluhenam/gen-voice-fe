import React from 'react'

const Spinner = () => {
  const style = {
    width: '20px',
    height: '20px'
  }
  return (
    <div className="spinner-border align-middle" role="status" style={style}>
      <span className="visually-hidden">Loading...</span>
    </div>
  )
}

export default Spinner
