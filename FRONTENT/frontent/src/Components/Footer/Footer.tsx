import React from 'react'
import "../Footer/Footer.css"
import dart from "../assets/images/dart.jpg"
import gmail from "../assets/images/gmail.png"
import instagram from "../assets/images/instagram.png"
import whatsapp from "../assets/images/whatsapp.png"

const Footer = () => {
  return (
    <div className='footer'>
      <div className="row">

        {/* About Section */}
        <div className="column1">
          <label>ABOUT</label>
          <p className='edittext'>
            Urban Strides is a trusted shoe seller offering high-quality products at
            affordable prices. We focus on delivering comfort, durability, and
            style bringing footwear directly to your doorstep in a convenient way.
          </p>
        </div>

        {/* Contact Us Section */}
        <div className="column2">
          <label>CONTACT-US</label>
          <p>
            <img src={whatsapp} alt='' width={20}/>
            <a href="tel:+919510297265">+91 95102 97265</a> / 
            <a href="tel:+919925729743">+91 99257 29743</a>
          </p>
          <p>
            <img src={gmail} alt='' width={20}/> 
            <a href="mailto:Urbanstrides6@gmail.com">urbanstrides@gmail.com</a>
          </p>
          <p>
            <img src={instagram} alt='' width={20}/> 
            <a className="instagram-link" href="https://www.instagram.com/p/DNZ6FXnhDMM/?igsh=aWE1OWdtMnYxbTh5" target="_blank" rel="noopener noreferrer">Instagram</a>
          </p>
        </div>

        {/* Shipping Method Section */}
        <div className="column3">
          <label>SHIPPING METHOD</label>
          <p className='editp'>
            <img src={dart} alt='' width={150}/>
          </p>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="copyright">
        <p>© 2025 Urban Strides. All Rights Reserved.</p>
      </div>
    </div>
  )
}

export default Footer
