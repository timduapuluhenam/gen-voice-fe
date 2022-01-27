import React from 'react'

import Navbar from '../components/Navbar'
import Card from '../components/Card'
import ImgBenefit1 from '../assets/img/benefit-1.png'
import ImgBenefit2 from '../assets/img/benefit-2.jpg'
import ImgBenefit3 from '../assets/img/benefit-3.png'
import ImgBenefit4 from '../assets/img/benefit-4.png'
import ImgBenefit5 from '../assets/img/benefit-5.png'
import ImgBenefit6 from '../assets/img/benefit-6.png'
import Footer from '../components/Footer'

const Feature = () => {
  return (
    <div>
      <Navbar/>
      <div className='d-flex justify-content-center' style={{ background: '#1F3A57', padding: '5em' }}>
        <div className='container text-center text-white'>
          <h2 className='text-white fw-bold'>Features at a Glance</h2>
          <h4>
            GenVoice somes with a fully-featured suite of invoicing for your business
          </h4>
        </div>
      </div>
      <div>
      <div className='p-4'>
        <div className='row d-flex justify-content-center'>
          <Card img={ImgBenefit1} title="Your Finances In One Place" text="Save time and get paid faster with recurring invoices."/>
          <Card img={ImgBenefit2} title="Accept Online Payments" text="Accept credit cards and many
  payment gateways"/>
          <Card img={ImgBenefit3} title="Tract Expenses & Mileage" text="Track expenses and trips
  with ease"/>
          <Card img={ImgBenefit4} title="Manage Multiple Businesses" text="Do you have multiple businesses with individual clients? You're in right place"/>
          <Card img={ImgBenefit5} title="Accept Online Payments" text="Accept credit cards and many
  payment gateways"/>
          <Card img={ImgBenefit6} title="Tract Your Invoice" text="Track expenses and trips
  with ease"/>
        </div>
      </div>
      </div>
      <Footer/>
    </div>
  )
}

export default Feature
