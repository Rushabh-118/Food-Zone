import React from 'react'
import './Header.css'

const Header = () => {

//first view of web

  return (
    <div className='header' id='header'>
      <div className="header-contents">
        <h2>Order your favorite food here</h2>
        <p>Choose from diverse menu featuring a delectable array of dishes crafted with love and care.Our mission is satisfy your cravings and elevate your dining experience.</p>
        <button><a href='#explore-menu'>
            View Menu
        </a></button>
      </div>
    </div>
  )
}

export default Header
