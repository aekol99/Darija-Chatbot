import React from 'react';
import './Navbar.css';
import logo from '../../logo.png';

function Navbar() {
  return (
    <nav className="navbar">
        <a className="navbar-brand mx-auto text-white" href="#">
          <img src={logo} alt="" className="logo-icon" />
            ChatAek
        </a>
      </nav>
  )
}

export default Navbar