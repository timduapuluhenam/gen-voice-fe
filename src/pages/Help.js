import React from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

import { useTitle } from 'react-use'

const Help = () => {
  useTitle('Help')

  return (
    <div>
      <Navbar/>
      <div className='d-flex justify-content-center p-5' style={{ background: '#1F3A57' }}>
        <div className='container'>
          <h2 className='text-center text-white fw-bold'>What We Can Help You?</h2>
        </div>
      </div>
      <div className='container mt-2 p-4'>
          <div className="accordion" id="accordionExample">
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingOne">
              <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                Upload your invoices
              </button>
            </h2>
            <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
              <div className="accordion-body">
                <ol className="list-group list-group-numbered list-group-flush">
                  <li className="list-group-item">To upload invoice, click <strong>Add your data</strong> in your right-top side of your dashboard</li>
                  <li className="list-group-item">And popup will flush in your screen, after that, fill the form, likes Invoice name and Your Expired Date of your invoice</li>
                  <li className="list-group-item">In below, there will be form to upload your invoice file, where our system can receive <strong>.xlxs</strong> and <strong>.csv</strong>. And make sure that your file schema is just like example in below.<br/>
                  Example: <a href='https://docs.google.com/spreadsheets/d/1fUXhckdUoS9IF8YY11KEf86PbWxMqK14V1m-tln95RE/edit?usp=sharing'>Link</a>
                  </li>
                  <li className='list-group-item'>
                    Before click <strong>Preview</strong>, make sure that your file schema is same with our example, unless you will get an alert that show an error. After that, you can click <strong>Preview</strong> to get a preview of your file before send to our database
                  </li>
                  <li className='list-group-item'>
                    After you sure about the preview, you can click <strong>Send</strong> and wait before you get success notification.
                  </li>
                  <li className='list-group-item'>
                    Thus, you can go back to your dashboard and see your invoice has been succesfully sent to our database.
                  </li>
                </ol>
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingTwo">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                Generate your reports
              </button>
            </h2>
            <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
              <div className="accordion-body">
                <ol className='list-group list-group-numbered list-group-flush'>
                  <li className='list-group-item'>
                    To create a report of your invoices, you can go to <strong>Reports</strong> Page in your dashboard
                  </li>
                  <li className='list-group-item'>
                    And then you can choose invoice name that you want to generate and whether the invoice has been paid or not
                  </li>
                  <li className='list-group-item'>
                    After you choose, you can click <strong>Generate</strong> to get preview of what report do you want to get
                  </li>
                  <li className='list-group-item'>
                    Finally, after the preview, you can click <strong>Download</strong>, to get a report in .xlxs file
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default Help
