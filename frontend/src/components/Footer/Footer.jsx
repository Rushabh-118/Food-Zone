import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {

//Information of footer

  return (
    <div className='footer' id ='footer'>
      <div className='footer_content'>
        <div className='footer_left'>
            <img src={assets.logo} alt="" />
            <p>Delivering delicious meals with a focus on quality and sustainability. Join us in our culinary journey!</p>
        </div>
        <div className='footer_right'>
            <h2>COMPANY</h2>
            <ul>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy policy</li>
            </ul>
        </div>
        <div className='footer_center'>
            <h2>CONTACT US</h2>
            <ul>
                <li>101, Vallabhnagar,pij road </li>
                <li>nadiad, Gujarat, 387002</li>
                <li>9924449223</li>
                <li>rushabhmistry118@gmail.com</li>
            </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        Copyright 2024 @ Tomato.com - All Right Reserved.
      </p>
      <p className="Owner">Made By <span>Rushabh_Mistry</span></p>
    </div>
  )
}

export default Footer
