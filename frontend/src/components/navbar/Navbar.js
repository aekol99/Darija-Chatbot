import React from 'react';
import './Navbar.css';
import logo from '../../logo.png';
import QuestionsMenu from '../questionsMenu/QuestionsMenu';

function Navbar() {
  return (
    <nav className="navbar">
      <a className="navbar-brand mx-auto text-white" href="#">
        <img src={logo} alt="" className="logo-icon" />
          ChatAek
      </a>
      <img src={logo} alt="" className='questions-btn' />
      <QuestionsMenu />
    </nav>
  )
}

export default Navbar