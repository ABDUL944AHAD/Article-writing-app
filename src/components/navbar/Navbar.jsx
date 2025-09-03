import React, { useState } from 'react';
import './Navbar.css';
import { Link as RouterLink } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <div className='navbar'>
      <div className='rightSide'>
        <h1 className='logo'>
          <RouterLink to='/'>DevWrite</RouterLink>
        </h1>
      </div>

      {/* Desktop Links */}
      <div className='leftSide'>
        <ul className='navLinks'>
          <li className='nav-link'>
            <RouterLink to='/'>Home</RouterLink>
          </li>
          <li className='nav-link'>
            <ScrollLink to="all-articles" smooth={true} duration={1500} offset={50}>
              Explore
            </ScrollLink>
          </li>
          <li className='nav-link'>
            <RouterLink to='/login'>Login</RouterLink>
          </li>
        </ul>

        <button className='button-primary'>
          <RouterLink className='button-link' to='/create-article'>
            Start Writing
          </RouterLink>
        </button>
      </div>

      {/* Hamburger Icon for Mobile */}
      <div className="hamburger" onClick={toggleMenu}>
        ☰
      </div>

      {/* Mobile Overlay Menu */}
      <div className={`mobileMenu ${isOpen ? 'open' : ''}`}>
        <button className="close-btn" onClick={closeMenu}>×</button>
        <ul>
          <li><RouterLink to='/' onClick={closeMenu}>Home</RouterLink></li>
          <li>
            <ScrollLink to="all-articles" smooth={true} duration={1500} offset={50} onClick={closeMenu}>
              Explore
            </ScrollLink>
          </li>
          <li><RouterLink to='/login' onClick={closeMenu}>Login</RouterLink></li>
          <li>
            <RouterLink to='/create-article' className="mobile-button" onClick={closeMenu}>
              Start Writing
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
