import React from 'react'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

import LandingImage from '../assets/img/landing-stock-image.png'

import style from '../assets/style/home.module.css'
import Card from '../components/Card'

import ImgBenefit1 from '../assets/img/benefit-1.png'
import ImgBenefit2 from '../assets/img/benefit-2.jpg'
import ImgBenefit3 from '../assets/img/benefit-3.png'
import Avatar from '../assets/img/avatar.png'
import { Icon } from '@iconify/react'
const Home = () => {
  return (
    <div>
      <Navbar/>

      {/* Landing Page */}
      <div className={`${style.stock} m-0 d-flex justify-content-between row`}>
        <img src={LandingImage} className={`${style.landingImage} col col-md`}/>
        <div className={`${style.landingTextlarge} col col-md row d-flex align-items-center`}>
          <div>
            Send Invoices to <br/> Your Customer Effectively
          </div>
          <div>
            <button className={`btn btn-light p-3 my-5 fw-bold ${style.btnLanding}`}>Start Using GenVoice for Free</button>
          </div>
          <div className={style.link}>
            <a href="/#">Check Our Features</a>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className={`container ${style.benefit}  p-4`}>
        <div className='row d-flex justify-content-center'>
          <Card img={ImgBenefit1} title="Your Finances In One Place" text="Save time and get paid faster with recurring invoices."/>
          <Card img={ImgBenefit2} title="Accept Online Payments" text="Accept credit cards and many
  payment gateways"/>
          <Card img={ImgBenefit3} title="Tract Expenses & Mileage" text="Track expenses and trips
  with ease"/>
        </div>
      </div>

      <div className='container d-flex justify-content-center my-4'>
        <a href="/#">
          <button className={`btn fs-5 fw-light px-4 py-2 ${style.btn}`}>Learn More About GenVoice</button>
        </a>
      </div>

      <div className={style.review}>
        <div className='container row'>
          <div className='col-md-2'>
            <img src={Avatar} className={style.avatar} />
          </div>
          <div className='col-md ms-4 my-3 d-flex flex-column justify-content-between'>
            <div className={style.reviewText}>
              &quot;Sick of Paper Invoices? Consider switching to a cloud app like invoicely to manage & track all of your invoices from a Single Dashboard.&quot;
            </div>
            <div className={style.reviewSource}>
              John Doe <br/>
              Founder of Edison Inc.
            </div>
          </div>
        </div>
      </div>

      <div className={`container ${style.listCustomer} p-5 d-flex justify-content-between`}>
        <Icon icon="cib:tesla" color="#dae1e7" width="100" height="100" />
        <Icon icon="simple-icons:mercedes" color="#dae1e7" width="100" height="100" />
        <Icon icon="cib:hp" color="#dae1e7" width="100" height="100" />
        <Icon icon="file-icons:amd" color="#dae1e7" width="100" height="100" />
        <Icon icon="bx:bxl-aws" color="#dae1e7" width="100" height="100" />
      </div>

      <Footer/>
    </div>
  )
}

export default Home
