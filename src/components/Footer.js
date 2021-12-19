import React from 'react'

const Footer = () => {
  const footerStyle = {
    background: '#0D1A33',
    color: 'white'
  }
  return (
    <div style={footerStyle}>
      <div className='container pt-3 pb-1'>
        <h5>Need More Help?</h5>
        gen@voice.com<br/>
        (+62) 123 123 1233<br/>
        Artha Graha<br/>
        Jend. Sudirman Street Kav 52-53<br/>
        Senayan, Kebayoran Baru, South Jakarta, Jakarta 12190<br/>
        <p className='text-center fw-light mt-3'>
          COPYRIGHT@2021
        </p>
      </div>
    </div>
  )
}

export default Footer
