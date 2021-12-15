/* eslint-disable react/prop-types */
import React from 'react'

import style from '../assets/style/card.module.css'
const Card = ({ img, title, text }) => {
  return (
    <div className={`${style.card} row`}>
      <img src={img} className={style.img}/>
      <div className=' d-flex flex-column text-center'>
        <h3 className='fw-bolder'>{title}</h3>
        {text}
      </div>
    </div>
  )
}

export default Card
