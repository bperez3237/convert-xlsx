import React from 'react'
import './Navbar.css'
import {Link} from 'react-router-dom'

function Navbar() {
  return (
    <div className='Navbar'>
      <div>
        <Link to='/'><h4>App Name</h4></Link>
      </div>
      <div>
        <Link to='/api-docs'>API Docs</Link>
        <Link to='/pricing'>Pricing</Link>
        <Link to='/faq'>FAQ</Link>
        <Link to='/support'>Support</Link>
        <Link to='/login'>Login</Link>
      </div>
    </div>
  )
}

export default Navbar